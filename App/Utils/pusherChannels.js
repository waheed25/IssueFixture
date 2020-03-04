const createPusherChannels = ({nid}) => ([
  {
    channel: `creation_like_${nid}`,
    events: ['insert', 'delete']
  },
  {
    channel: `creation_refiq_${nid}`,
    events: ['insert', 'delete']
  },
  {
    channel: `creation_views_${nid}`,
    events: ['insert']
  },
  {
    channel: `creation_${nid}`,
    events: ['update']
  },
  {
    channel: `creation_comment_${nid}`,
    events: ['insert', 'delete']
  }
])
export default createPusherChannels
