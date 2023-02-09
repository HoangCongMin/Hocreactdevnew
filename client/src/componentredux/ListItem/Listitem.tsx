import Item from "../Item/Item";
import {  useSelector ,useDispatch} from "react-redux";
import { RootState,useAppDisPacth } from "../../store";
import { useEffect } from "react";
import { getTodo ,startEdit,remove} from "../reducer";
export default function Listitem() {
  const selector = useSelector((state: RootState) => state.blog.listitem);
  const dispatchone = useAppDisPacth();
  const dispatch = useDispatch();


  const handledit = (id: string) => {
    dispatch(startEdit(id));
  };

  const handleRemove = (id: string) => {
    dispatchone(remove(id));
    
  };


  useEffect(() => {
    // const controller = new AbortController();
    // const getListItem = async () => {
    //   try {
    //     const res = await http.get("post", { signal: controller.signal });
    //     dispatch(getTodo(res.data));
    //   } catch (error) {
    //     console.log(error);
    //   }
    // };

    // getListItem();
    // return () => {
    //   controller.abort();
    // };

    const ma= dispatchone(getTodo())
    return()=>{
      ma.abort()
    }
   
  }, [dispatchone]);
  return (
    <div>
      <div className="bg-white py-6 sm:py-8 lg:py-12">
        <div className="mx-auto max-w-screen-xl px-4 md:px-8">
          <div className="mb-10 md:mb-16">
            <h2 className="mb-4 text-center text-2xl font-bold text-gray-800 md:mb-6 lg:text-3xl">
              Được Dev Blog
            </h2>
            <p className="mx-auto max-w-screen-md text-center text-gray-500 md:text-lg">
              Đừng bao giờ từ bỏ. Hôm nay khó khăn, ngày mai sẽ trở nên tồi tệ.
              Nhưng ngày mốt sẽ có nắng
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 md:gap-6 lg:grid-cols-2 xl:grid-cols-2 xl:gap-8">
            {selector.map((item) => (
              <Item
              handleRemove={handleRemove}
              handledit={handledit}
                key={item.id}
                id={item.id}
                img={item.featuredImage}
                date={item.publishDate}
                content={item.description}
                title={item.title}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
