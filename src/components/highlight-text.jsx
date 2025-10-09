// Utility component untuk highlight text yang match dengan search query
export const HighlightText = ({ text, searchTerm }) => {
  if (!searchTerm || !text) return <>{text}</>;

  console.log( text, searchTerm, "<><><><");
  

  // Escape special regex characters
  const escapeRegex = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  
  try {
    const regex = new RegExp(`(${escapeRegex(searchTerm)})`, 'gi');
    const parts = text.split(regex);

    return (
      <>
        {parts.map((part, index) => {
          const isMatch = part.toLowerCase() === searchTerm.toLowerCase();
          return isMatch ? (
            <strong key={index} className="font-black text-blue-600 dark:text-blue-300 dark:text-mainColorDark">
              {part}
            </strong>
          ) : (
            <span key={index}>{part}</span>
          );
        })}
      </>
    );
  } catch (error) {
    // Fallback jika regex error
    return <>{text}</>;
  }
};