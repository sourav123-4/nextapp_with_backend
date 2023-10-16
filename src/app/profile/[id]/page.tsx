import React from 'react'

function userProfile({params}:any) {
  return (
    <div>
      {params.id}
    </div>
  )
}

export default userProfile
