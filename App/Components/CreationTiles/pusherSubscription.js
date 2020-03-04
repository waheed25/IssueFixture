import React from 'react'
import { fetchComment, handleDataChange, InitializePusher } from '../../Utils'
import { withUpdatePusherData } from '../../Redux/hoc/withPusher/updatePusherActions'
import { fetchSingleComment } from '../../Utils/params'
import _ from 'underscore'
import { fetchCommentSerivce } from '../../Services/data/comment'

class PusherSubscription extends React.PureComponent {
  creationDetailUpdated= false
  isCommentUpdated= false
  componentDidMount () {
    this.pusherSubscription(this.props.nid)
  }

  pusherSubscription=(nid) => {
    this.channels = [
      // {
      //   channel: `creation_like_${nid}`,
      //   events: ['insert', 'delete']
      // },
      // {
      //   channel: `creation_refiq_${nid}`,
      //   events: ['insert', 'delete']
      // },
      // {
      //   channel: `creation_views_${nid}`,
      //   events: ['insert']
      // },
      {
        channel: `creation_${nid}`,
        events: ['meta_update', 'update', 'insert', 'delete']
      },
      {
        channel: `creation_comment_${nid}`,
        events: ['insert', 'delete']
      }
    ]
    var pusher
    if (!pusher) {
      pusher = InitializePusher()
    }
    // pusher is connected
    _.each(this.channels, (channel) => {
      var singleChannel = pusher.subscribe(channel.channel)
      channel.events.map((event) => {
        singleChannel.bind(event, async (data) => {
          console.log('data.type', data.type)
          debugger
          if (data.type === 'comment' && data.action === 'insert' && !this.isCommentUpdated) {
            this.isCommentUpdated = true
            await this.fetchComment(data)
            setTimeout(() => { this.isCommentUpdated = false }, 5000)
          }
          if (data.data.data.meta && data.data.data.meta.key === 'VIEWS_COUNT') {

          }
          // if (data.type === 'creation' && data.action === 'meta_update') {
          //
          // }
          else {
            const updatedData = await handleDataChange(this.props.data, data, this.props.index, this.props.uid)
            debugger
            if (data.action !== 'update') {
              this.identifyList(this.props.listName, updatedData)
            }
          }
          // this.props.updatePusherData(updatedData)
          // console.log('pusher data', updatedData)
        })
      })

      // this.props.subscribeChannel(channel)
      // run a loop and subscribe to pusher through owner pusher library
    })
  }

  identifyList=(listName, updatedData) => {
    if (listName === 'popular') {
      this.props.updatePopularList(updatedData)
    }
    if (listName === 'creationDetail' && this.creationDetailUpdated) {
      this.creationDetailUpdated = true
      this.props.updateCreationDetailsList(updatedData)
    }
    if (listName === 'userCreations') {
      this.props.updateUserCreationList(updatedData)
    }
  }
  fetchComment=async (pusherData) => {
    debugger
    const params = ''
    const apiType = `/wefiq/comment/${pusherData.data.uuid}`
    const newComment = await fetchCommentSerivce(params, apiType)
    this.props.updateCommentList(newComment)
    debugger
  }

  render () {
    return (
      <React.Fragment>{this.props.children}</React.Fragment>
    )
  }
}

export default withUpdatePusherData(PusherSubscription)
