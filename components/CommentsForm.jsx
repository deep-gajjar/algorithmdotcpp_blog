import React, { useRef, useState, useEffect } from 'react'
import { submitComment } from '../services'

const CommentsForm = ({ slug }) => {
  const [error, setError] = useState(false);
  const [localStorage, setLocalStorage] = useState(null);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const commentEl = useRef()
  const nameEl = useRef()
  const emailEl = useRef()
  const storeDataEl = useRef()

  useEffect(() => {
    nameEl.current.value = window.localStorage.getItem('name');
    emailEl.current.value = window.localStorage.getItem('email');
  }, [])
  
  const handleCommentSubmission = () => {
    setError(false);
    const { value: comment } = commentEl.current
    const { value: name } = nameEl.current
    const { value: email } = emailEl.current
    const { checked: storeData } = storeDataEl.current

    if (!comment || !name || !email) {
      setError(true); return;
    }
    const commentObj = {
      name: name, comment: comment, email: email, slug: slug
    }

    if (storeData) {
      window.localStorage.setItem("name", name);
      window.localStorage.setItem("email", email);
    }
    else {
      window.localStorage.removeItem("name", name);
      window.localStorage.removeItem("email", email);
    }

    submitComment(commentObj)
      .then((res) => {
        setShowSuccessMessage(true);
        setTimeout(() => {
          setShowSuccessMessage(false);
        }, 3000);
      })
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-8 pb-12 mb-8">
      <h3 className="font-semibold border-b pb-4 mb-8">
        Leave a Comment:
      </h3>
      <div className="mb-4 grid grid-cols-1 gap-4">
        <textarea
          ref={commentEl}
          className="bg-gray-100 p-4 outline-none  w-full rounded-lg focus:ring-2 focus:ring-blue-100 text-gray-700"
          placeholder="Comment"
          name="comment"
        />
      </div>

      <div className="mb-4 grid grid-cols-1 lg:grid-cols-2 gap-4">
        <input
          ref={nameEl}
          className="bg-gray-100 py-2 px-4 outline-none  w-full rounded-lg focus:ring-2 focus:ring-blue-100 text-gray-700"
          placeholder="Name"
          name="name"
        />
        <input
          ref={emailEl}
          className="bg-gray-100 py-2 px-4 outline-none  w-full rounded-lg focus:ring-2 focus:ring-blue-100 text-gray-700"
          placeholder="Email"
          name="email"
        />
      </div>

      <div className="mb-4 grid grid-cols-1 gap-4">
        <div>
          <input type="checkbox" ref={storeDataEl} id="storeData" name="storeData" value="true" />
          <label htmlFor="storeData" className="text-gray-500 cursor-pointer ml-2">Save my e-mail and name for the next time I comment.</label>
        </div>
      </div>
      {error && <p className="text-red-500 text-xs">Please enter all details!</p>}
      <div className="mt-8">
        <button
          type="button"
          className="transition duration-500 ease hover:bg-blue-500 inline-block bg-pink-600 text-lg rounded-full text-white py-3 px-8" onClick={handleCommentSubmission}>
          Post Comment
        </button>
        {showSuccessMessage && <span className=" float-right font-semibold text-green-500 mt-4">Comment submitted for review</span>}
      </div>
    </div>
  )
}

export default CommentsForm