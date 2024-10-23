import { useEffect, useState } from "react";
import { TiDelete } from "react-icons/ti";

export default function TagSelector({
  tags,
  setTags,
}: {
  tags: string[];
  setTags: (tags: string[]) => void;
}) {
  const [localTags, setLocalTags] = useState<string[]>(tags);
  const [inputValue, setInputValue] = useState<string>("");
  const [isFocused, setIsFocused] = useState(false);

  const handlelNewTag = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputValue.length > 0) {
      const strings = inputValue
        .split(",")
        .filter((s) => !tags.includes(s));
      setLocalTags([...localTags, ...strings]);
      setTags([...localTags, ...strings]);
      setInputValue("");
    }
  };

  const handleRemoveTag = (tag: string) => {
    setLocalTags(localTags.filter((t) => t !== tag));
    setTags(localTags.filter((t) => t !== tag));
  };

  useEffect(() => {
    if (tags.length === 0) {
      setLocalTags(tags);
    }
  },[tags])

  return (
    <div className="w-full border p-2">
      <p className="text-xs text-[#a0a0a0] mb-1">Tags:</p>
      <form onSubmit={handlelNewTag}>
        <div className="border w-full p-2 relative">
          {isFocused && (
            <div className="absolute rounded-sm inset-0 z-10 shadow-[inset_0_0_0_2px_black]" />
          )}
          <input
            placeholder="comma-separated tag strings (enter to submit)"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setInputValue(e.target.value)
            }
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            className="w-full"
            type="text"
            value={inputValue}
          />
        </div>
      </form>
      <div className="flex flex-wrap gap-1 mt-2 min-h-[40px]">
        {localTags.length > 0 ? (
          localTags.map((tag, index) => (
            <div
              key={index}
              className="h-fit bg-gray-200 text-gray-500 pr-1 pl-3 rounded-2xl flex items-center gap-1"
            >
              {tag}
              <TiDelete
                onClick={() => handleRemoveTag(tag)}
                className="cursor-pointer"
                size={20}
              />
            </div>
          ))
        ) : (
          <p className="text-xs text-[#a0a0a0] mt-2">no tags found</p>
        )}
      </div>
    </div>
  );
}
