import { useEffect, useState } from "react";
import { fromdata } from "../../Type/Todo.type";
import {  useSelector,useDispatch } from "react-redux";
import { addPost, Updatepost ,cancaledit} from "../reducer";
import { RootState,useAppDisPacth } from "../../store";

export default function CreatItem() {
  const initialState: fromdata = {
    id: "",
    description: "",
    featuredImage: "",
    published: false,
    publishDate: "",
    title: "",
  };

  const item = useSelector((state: RootState) => state.blog.item);

  const [data, setData] = useState<fromdata>(initialState);

  const dispatch = useDispatch();
  const dispatchone=useAppDisPacth()

  const canceledit=()=>{
      dispatch(cancaledit())
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (item) {
      dispatchone(Updatepost(data));
      setData(initialState)
    } else {
      // const dataall={...data,id:new Date().toISOString()}
      dispatchone(addPost(data));
    }
    setData(initialState);
  };
  useEffect(() => {
    setData(item || initialState);
  }, [item]);
  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-6">
        <label
          htmlFor="title"
          className="mb-2 block text-sm font-medium text-gray-900 dark:text-gray-300"
        >
          Title
        </label>
        <input
          type="text"
          id="title"
          className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-blue-500"
          placeholder="Title"
          required
          value={data.title}
          onChange={(e) => setData({ ...data, title: e.target.value })}
        />
      </div>
      <div className="mb-6">
        <label
          htmlFor="featuredImage"
          className="mb-2 block text-sm font-medium text-gray-900 dark:text-gray-300"
        >
          Featured Image
        </label>
        <input
          type="text"
          id="featuredImage"
          className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-blue-500"
          placeholder="Url image"
          required
          value={data.featuredImage}
          onChange={(e) => setData({ ...data, featuredImage: e.target.value })}
        />
      </div>
      <div className="mb-6">
        <div>
          <label
            htmlFor="description"
            className="mb-2 block text-sm font-medium text-gray-900 dark:text-gray-400"
          >
            Description
          </label>
          <textarea
            id="description"
            rows={3}
            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-blue-500"
            placeholder="Your description..."
            required
            value={data.description}
            onChange={(e) => setData({ ...data, description: e.target.value })}
          />
        </div>
      </div>
      <div className="mb-6">
        <label
          htmlFor="publishDate"
          className="mb-2 block text-sm font-medium text-gray-900 dark:text-gray-300"
        >
          Publish Date
        </label>
        <input
          type="datetime-local"
          id="publishDate"
          className="block w-56 rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-blue-500"
          placeholder="Title"
          required
          value={data.publishDate}
          onChange={(e) => setData({ ...data, publishDate: e.target.value })}
        />
      </div>
      <div className="mb-6 flex items-center">
        <input
          id="publish"
          type="checkbox"
          className="h-4 w-4 focus:ring-2 focus:ring-blue-500"
          checked={data.published}
          onChange={(e) => setData({ ...data, published: e.target.checked })}
        />
        <label
          htmlFor="publish"
          className="ml-2 text-sm font-medium text-gray-900"
        >
          Publish
        </label>
      </div>
      <div>
        {!item && (
          <button
            className="group relative inline-flex items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br from-purple-600 to-blue-500 p-0.5 text-sm font-medium text-gray-900 hover:text-white focus:outline-none focus:ring-4 focus:ring-blue-300 group-hover:from-purple-600 group-hover:to-blue-500 dark:text-white dark:focus:ring-blue-800"
            type="submit"
          >
            <span className="relative rounded-md bg-white px-5 py-2.5 transition-all duration-75 ease-in group-hover:bg-opacity-0 dark:bg-gray-900">
              Publish Post
            </span>
          </button>
        )}
        {item && (
          <div>
            <button
              type="submit"
              className="group relative mb-2 mr-2 inline-flex items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br from-teal-300 to-lime-300 p-0.5 text-sm font-medium text-gray-900 focus:outline-none focus:ring-4 focus:ring-lime-200 group-hover:from-teal-300 group-hover:to-lime-300 dark:text-white dark:hover:text-gray-900 dark:focus:ring-lime-800"
            >
              <span className="relative rounded-md bg-white px-5 py-2.5 transition-all duration-75 ease-in group-hover:bg-opacity-0 dark:bg-gray-900">
                Update Post
              </span>
            </button>
            <button
            onClick={canceledit}
              type="reset"
              className="group relative mb-2 mr-2 inline-flex items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br from-red-200 via-red-300 to-yellow-200 p-0.5 text-sm font-medium text-gray-900 focus:outline-none focus:ring-4 focus:ring-red-100 group-hover:from-red-200 group-hover:via-red-300 group-hover:to-yellow-200 dark:text-white dark:hover:text-gray-900 dark:focus:ring-red-400"
            >
              <span className="relative rounded-md bg-white px-5 py-2.5 transition-all duration-75 ease-in group-hover:bg-opacity-0 dark:bg-gray-900">
                Cancel
              </span>
            </button>
          </div>
        )}
      </div>
    </form>
  );
}
