import CommentCard from "../components/cards/CommentCard";
import React, { useEffect, useState } from "react";
import useCommentStore from "../store/useCommentStore";

export default function CommentManager() {
  const { comments, approve, remove, reply, loading } = useCommentStore();
  const [localLoading, setLocalLoading] = useState(true);
  const [localComments, setLocalComments] = useState([]);

  useEffect(() => {
    const fetchAllNewComments = async () => {
      setLocalLoading(true);
      try {
        const response = await fetch("http://localhost:4000/api/comments/new");
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        if (Array.isArray(data)) {
          setLocalComments(data);
        } else {
          console.error("Fetched data is not an array:", data);
          setLocalComments([]);
        }
      } catch (error) {
        console.error("Failed to fetch all new comments:", error);
        setLocalComments([]);
      } finally {
        setLocalLoading(false);
      }
    };

    fetchAllNewComments();
  }, []);

  const handleApprove = async (id) => {
    await approve(id);
    // Refresh the comments list after approval
    setLocalComments(prevComments => prevComments.filter(c => c._id !== id));
  };

  const handleDelete = async (id) => {
    await remove(id);
    // Refresh the comments list after deletion
    setLocalComments(prevComments => prevComments.filter(c => c._id !== id));
  };

  const handleReply = async (id, replyText) => {
    await reply(id, replyText);
    // Refresh the comments list after reply
    setLocalComments(prevComments => 
      prevComments.map(c => c._id === id ? { ...c, reply: replyText } : c)
    );
  };

  return (
    <div className="p-6 bg-white dark:bg-gray-900 rounded-lg shadow">
      <h1 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Comment Manager</h1>

      {localLoading ? (
        <p className="text-gray-500">Loading comments...</p>
      ) : localComments.length > 0 ? (
        localComments.map((comment) => (
          <CommentCard
            key={comment._id}
            comment={comment}
            onApprove={() => handleApprove(comment._id)}
            onDelete={() => handleDelete(comment._id)}
            onReply={(replyText) => handleReply(comment._id, replyText)}
          />
        ))
      ) : (
        <p className="text-gray-500">No new comments to manage.</p>
      )}
    </div>
  );
}