export const formatRelativeDate = (timestamp) => {
    const now = new Date();
    const date = new Date(timestamp);
    const diffInMs = date - now;
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
  
    if (diffInDays === 0) return "Today";
    if (diffInDays === 1) return "Tomorrow";
    if (diffInDays < 0) return `${Math.abs(diffInDays)} days ago`;
    
    return date.toLocaleDateString(); // Fallback
  };
  