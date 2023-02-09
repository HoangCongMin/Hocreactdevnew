import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fromdata } from "../Type/Todo.type";
import http from "../utils/http";
// import { initaraystate } from "../constanall";

interface stateinit {
  listitem: fromdata[];
  item: fromdata | null;
}

const initialState: stateinit = {
  listitem: [],
  item: null,
};

export const getTodo = createAsyncThunk("getPost", async (_, thunkAPI) => {
  try {
    const res = await http.get("post", { signal: thunkAPI.signal });
    return res.data;
  } catch (error) {
    console.log(error);
  }
});

export const addPost = createAsyncThunk(
  "addPost",
  async (body: fromdata, thunkAPI) => {
    try {
      const res = await http.post("post", body, { signal: thunkAPI.signal });
      return res.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const remove = createAsyncThunk(
  "remove",
  async (body: string, thunkAPI) => {
    try {
      const res = await http.delete(`post/${body}`, {
        signal: thunkAPI.signal,
      });
      return res.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const Updatepost = createAsyncThunk(
  "Updatepost",
  async (body: fromdata, thunkAPI) => {
    try {
      const res = await http.put(`post/${body.id}`, body, {
        signal: thunkAPI.signal,
      });
      console.log(res.data);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  }
);

const reducerslice = createSlice({
  name: "blog",
  initialState,
  reducers: {
    // getTodo(state, action) {
    //   state.listitem = action.payload;
    // },
    // addPost(state, action) {
    //   state.listitem.push(action.payload);
    // },
    // remove(state, action) {
    //   const ma = state.listitem.findIndex((item) => item.id === action.payload);
    //   if (ma !== -1) {
    //     state.listitem.slice(ma, 1);
    //   }
    // },
    startEdit(state, action) {
      const startedit =
        state.listitem.find((item) => item.id === action.payload) || null;
      state.item = startedit;
    },
    cancaledit(state) {
      state.item = null;
    },
    // Updatepost(state, action) {
    //   state.listitem.map((item, index) => {
    //     if (item.id === action.payload.id) {
    //       return (state.listitem[index] = action.payload);
    //     }
    //   });

    //   state.item = null;
    // },
  },
  extraReducers(builder) {
    //   builder.addCase('getPost',(state,action:any)=>{
    //     state.listitem=action.payload
    // })

    builder
      .addCase(getTodo.fulfilled, (state, action) => {
        state.listitem = action.payload;
      })
      .addCase(addPost.fulfilled, (state, action) => {
        state.listitem.push(action.payload);
      })
      .addCase(remove.fulfilled, (state, action) => {
        const ma = state.listitem.findIndex(
          (item) => item.id === action.meta.arg
        );
        if (ma !== -1) state.listitem.slice(ma, 1);
      })
      .addCase(Updatepost.fulfilled, (state, action) => {
        state.listitem.find((item, index) => {
          if (item.id === action.payload.id) {
            state.listitem[index] = action.payload;
            return true;
          }
          return false;
        });
        state.item = null;
      });
  },
});

export const { startEdit, cancaledit } = reducerslice.actions;

const blogreduce = reducerslice.reducer;

export default blogreduce;

// export const addPost = createAction<fromdata>("addPost");
// export const remove = createAction<string>("removepost");
// export const startEdit = createAction<string>("starteditpost");
// export const Updatepost = createAction<fromdata>("updatepost");

// const blogreduce = createReducer(initialState, (builder) =>
//   builder
//     .addCase(addPost, (state, action) => {
//       state.listitem.push(action.payload);
//     })
//     .addCase(remove, (state, action) => {
//       const remove = state.listitem.filter(
//         (item) => item.id !== action.payload
//       );
//       state.listitem = remove;
//       // const foundPostIndex = state.listitem.findIndex(
//       //   (post) => post.id === action.payload
//       // );
//       // console.log(foundPostIndex);
//       // if (foundPostIndex !== -1) {
//       //   state.listitem.splice(foundPostIndex, 1);
//       // }
//     })
//     .addCase(startEdit, (state, action) => {
//       const startEditall =
//         state.listitem.find((itemone) => itemone.id === action.payload) || null;
//       state.item = startEditall;
//     })
//     .addCase(Updatepost, (state, action) => {
//       // state.listitem.some((itemall, index) => {
//       //   if (itemall.id === action.payload.id) {
//       //     state.listitem[index] = action.payload;
//       //     return true;
//       //   }
//       //   return false;
//       // });

//       const ma = state.listitem.map((itemall) => {
//         if (itemall.id === action.payload.id) {
//           return (itemall = action.payload);
//         }
//         return itemall;
//       });

//       state.listitem = ma;

//       state.item = null;
//     })
// );

// // const blogReducer = createReducer(initialState, (builder) => {
// //   builder
// //     .addCase(addPost, (state, action) => {

// //       const post = action.payload
// //       state.listitem.push(post)
// //     })})
