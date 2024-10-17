export default function Searchbar({ title, onSearch }) {
    return (
        <input
            type="text"
            placeholder={title}
            className="flex-grow h-full px-2 py-1 rounded-md text-gray-700 bg-transparent border-2 border-gray-400 focus:outline-none focus:ring-2 focus:ring-[#e7b100] focus:border-transparent"
            onChange={(e) => onSearch(e.target.value)}
        />
    );
}