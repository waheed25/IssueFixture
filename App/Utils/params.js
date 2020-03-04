export function followersList (limit, offset, catId) {
  return {
    include: 'uid',
    page: {
      limit: limit,
      offset: offset
    }
  }
}

export function popularCreationsParams (limit, offset, catId) {
  return ({
    page: {
      limit: limit,
      offset: offset
    },
    filter: {
      status: {
        condition: {
          path: 'status',
          value: true
        }
      },
      cat_filter: {
        condition: {
        }
      }
    },
    sort: 'popular',
    '_search_api': 'creation',
    refreshing: false
  }
  )
}

export function feedCreationsParams (limit, offset, catId) {
  return ({
    page: {
      limit: limit,
      offset: offset
    },
    filter: {
      status: {
        condition: {
          path: 'status',
          value: true
        }
      }
    },
    sort: {
      'by-date': {
        path: 'created',
        direction: 'DESC'
      }
    }
  }
  )
}

export function fetchCreationsByCategoriesLatest (limit, offset, catId) {
  return ({
    include: 'uid,category',
    page: {
      limit: limit,
      offset: offset
    },
    filter: {
      status: {
        condition: {
          path: 'status',
          value: true
        }
      },
      cat_filter: {
        condition: {
          path: 'category.tid',
          value: catId
        }
      }
    },
    sort: {
      'by-date': {
        path: 'created',
        direction: 'DESC'
      }
    }
  }
  )
}

export function latestCreationsParams (limit, offset) {
  return ({
    include: 'uid,category',
    page: {
      limit: limit,
      offset: offset
    },
    filter: {
      status: {
        condition: {
          path: 'status',
          value: true
        }
      },
      cat_filter: {
        condition: {
        }
      }

    },
    sort: 'latest',
    '_search_api': 'creation'
  }
  )
}

export function refiqsCreationsParams (limit, offset, id) {
  return ({
    page: {
      limit: limit,
      offset: offset
    },
    filter: {
      author: {
        condition: {
          path: 'user_id.uid',
          value: id
        }
      },
      type: {
        condition: {
          path: 'activity_type',
          value: 'refiq'
        }
      }
    }
  }
  )
}

export function userCreationsParams ({limit, offset, id}) {
  return ({
    // include: 'uid,category',
    page: {
      limit: limit,
      offset: offset
    },
    filter: {
      author: {
        condition: {
          path: 'uid.uid',
          value: id,
          operator: '='
        }
      }
    },
    sort: '-created'
  }
  )
}
export function fetchComment ({limit, offset, id}) {
  return ({
    page: {
      limit: limit,
      offset: offset
    },
    filter: {
      'node-comments': {
        condition: {
          path: 'entity_id',
          value: id
        }
      },
      parent: {
        condition: {
          path: 'pid',
          value: '0',
          operator: '='
        }
      }
    },
    sort: {
      'by-created': {
        path: 'created',
        direction: 'DESC'
      }
    }
  }
  )
}

export function likeParams (drupalInternalNid) {
  return {
    data: {
      attributes: { activity_type: 'like',
        target_type: 'node',
        target_id: drupalInternalNid
      },
      type: 'activity'
    }
  }
}
export function refiqParams (drupalInternalNid) {
  return {
    data: {
      attributes: { activity_type: 'refiq',
        target_type: 'node',
        target_id: drupalInternalNid
      },
      type: 'activity'
    }
  }
}
export function postAComment (nid, userID, comment, creationId) {
  return {
    data: {
      attributes: {
        body: {
          format: 'basic_html',
          value: comment
        },
        entity_id: creationId
      },
      type: 'comment'
    }}
}
export function fetchSingleComment () {
  return {
    include: 'uid,entity_id',
    fields: {
      user: 'name,picture_url,profile_name',
      comment: 'drupal_internal__cid,uuid,status,subject,name,created,changed,thread,body,uid,entity_id,entity_type,replies_count',
      creation: 'nid'
    }
  }
}

export function searchCreationParams ({limit, offset, searchText}) {
  return {
    q: searchText,
    page: {
      limit: limit,
      offset: offset
    },
    filter: {
      status: {
        condition: {
          path: 'status',
          value: true
        }
      },
      cat_filter: {
        condition: {
        }
      }
    },
    sort: 'popular',
    _search_api: 'creation'
  }
}
export function searchCreatorParams ({limit, offset, searchText, lat, lng}) {
  return {
    q: searchText,
    include: 'uid',
    page: {
      limit: limit
      // offset: offset
    },
    _filter: {
      geo: {
        condition: {
          lat: 'NaN',
          lng: 'NaN',
          proximity: '7800'
        }
      }
    },
    _search_api: 'profile'
  }
}
export function notificationParams ({limit, offset}) {
  return {
    include: 'user_id,attached_entity,attached_entity',
    page: {
      limit: limit,
      offset: offset
    },
    fields: {
      user: 'uid,name,profile_name,picture_url'
    },
    sort: {
      'by-created': {
        path: 'created',
        direction: 'DESC'
      }
    },
    filter: {
      context: {
        condition: {
          path: 'context',
          value: 'general'
        }
      }
    }
  }
}
