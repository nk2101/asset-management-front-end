import React, { useState } from "react";

// Mock current user
const currentUser = { id: 1, username: "nantha" };

// Mock forum and comment data
const initialForums = [
  {
    id: 1,
    title: "First Forum",
    description: "This is a discussion about JavaScript.",
    tags: ["js", "frontend"],
    createdAt: "2025-04-13T12:00:00Z",
    createdBy: { id: 1, username: "nantha" },
    comments: [
      {
        id: 1,
        content: "This is interesting!",
        createdAt: "2025-04-13T13:00:00Z",
        createdBy: { id: 2, username: "arun" },
      },
    ],
  },
];

const Forums = () => {
  const [forums, setForums] = useState(initialForums);
  const [newForum, setNewForum] = useState({ title: "", description: "", tags: "" });

  const handleCreateForum = () => {
    const newId = forums.length + 1;
    const forum = {
      id: newId,
      ...newForum,
      tags: newForum.tags.split(",").map((t) => t.trim()),
      createdAt: new Date().toISOString(),
      createdBy: currentUser,
      comments: [],
    };
    setForums([...forums, forum]);
    setNewForum({ title: "", description: "", tags: "" });
  };

  const handleDeleteForum = (forumId) => {
    setForums(forums.filter((f) => f.id !== forumId));
  };

  const handleAddComment = (forumId, content) => {
    setForums((prev) =>
      prev.map((forum) =>
        forum.id === forumId
          ? {
              ...forum,
              comments: [
                ...forum.comments,
                {
                  id: forum.comments.length + 1,
                  content,
                  createdAt: new Date().toISOString(),
                  createdBy: currentUser,
                },
              ],
            }
          : forum
      )
    );
  };

  const handleDeleteComment = (forumId, commentId) => {
    setForums((prev) =>
      prev.map((forum) =>
        forum.id === forumId
          ? {
              ...forum,
              comments: forum.comments.filter((c) => c.id !== commentId),
            }
          : forum
      )
    );
  };

  return (
    <div className="p-4 max-w-3xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold">Forums</h1>

      {/* Create Forum */}
      <div className="border p-4 rounded">
        <h2 className="font-semibold mb-2">Create Forum</h2>
        <input
          placeholder="Title"
          value={newForum.title}
          onChange={(e) => setNewForum({ ...newForum, title: e.target.value })}
          className="border p-2 w-full mb-2"
        />
        <textarea
          placeholder="Description"
          value={newForum.description}
          onChange={(e) => setNewForum({ ...newForum, description: e.target.value })}
          className="border p-2 w-full mb-2"
        />
        <input
          placeholder="Tags (comma separated)"
          value={newForum.tags}
          onChange={(e) => setNewForum({ ...newForum, tags: e.target.value })}
          className="border p-2 w-full mb-2"
        />
        <button onClick={handleCreateForum} className="bg-blue-500 text-white px-4 py-2 rounded">
          Post
        </button>
      </div>

      {/* Forum List */}
      {forums.map((forum) => (
        <div key={forum.id} className="border p-4 rounded space-y-2">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold">{forum.title}</h2>
            {forum.createdBy.id === currentUser.id && (
              <button onClick={() => handleDeleteForum(forum.id)} className="text-red-500 text-sm">
                Delete
              </button>
            )}
          </div>
          <p>{forum.description}</p>
          <p className="text-sm text-gray-500">
            Tags: {forum.tags.join(", ")} | Posted by {forum.createdBy.username} on{" "}
            {new Date(forum.createdAt).toLocaleString()}
          </p>

          {/* Comments Section */}
          <div className="mt-4">
            <h3 className="font-semibold">Comments</h3>
            {forum.comments.map((comment) => (
              <div key={comment.id} className="border-t pt-2 flex justify-between items-center">
                <p>
                  <strong>{comment.createdBy.username}:</strong> {comment.content}
                </p>
                {comment.createdBy.id === currentUser.id && (
                  <button
                    onClick={() => handleDeleteComment(forum.id, comment.id)}
                    className="text-red-500 text-xs"
                  >
                    Delete
                  </button>
                )}
              </div>
            ))}

            {/* Add Comment */}
            <AddCommentForm onSubmit={(content) => handleAddComment(forum.id, content)} />
          </div>
        </div>
      ))}
    </div>
  );
};

const AddCommentForm = ({ onSubmit }) => {
  const [text, setText] = useState("");
  return (
    <div className="mt-2">
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Write a comment..."
        className="border p-2 w-full"
      />
      <button
        onClick={() => {
          onSubmit(text);
          setText("");
        }}
        className="bg-green-500 text-white px-2 py-1 mt-2 rounded"
      >
        Comment
      </button>
    </div>
  );
};

export default Forums;
