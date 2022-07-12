import React, { useState, useEffect } from 'react'
import moment from 'moment'
import parse from 'html-react-parser'
import { getComments } from '../services'

const Comments = ({ slug }) => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    getComments(slug).then((result)=> setComments(result));
  }, [])
  return (
    <>
    {/* {console.log([comments.length, 'deep'])} */}
      {comments.length > 0 && (
        <div className="bg-white shadow-lg rounded-lg p-8 pb-12 mb-4">
          <h3 className="text-xl font-semibold border-b pb-4 mb-8">
            {comments.length}{' '}Comments
          </h3>
          {comments.map((comment) => (
            <div key={comment.createdAt} className="border-b pb-4 mb-4 border-gray-100">
              <p className="mb-4"><span className="font-semibold">{comment.name}</span>
                {' '}
                on
                {' '}
                {moment(comment.createdAt).format('MMM DD, YYYY')}
              </p>
              <p className="whitespace-pre-line w-full text-gray-700">
                {parse(comment.comment)}
              </p>
            </div>
          ))}
        </div>
      )}
    </>
  )
}

export default Comments