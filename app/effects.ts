import {loadingPosts,loadingFailed,postsReceived,AppAction,Post} from './store'
import 'reddit.js'

declare const reddit: any

const limit = 50

export const search = (term: string) => (dispatch: (a: AppAction) => any) => {
  dispatch(loadingPosts());
  reddit.top(term || undefined).limit(limit).fetch(
    (res: any) =>{
      try{
        let posts = res.data.children;
        console.log(posts);
        posts = 
          posts
            .map((x: any) => x.data)
            .filter((x: any) => !!x)
            .map((x: any): Post => ({url:'http://reddit.com'+x.permalink,title:x.title,image:x.thumbnail}))
            .filter((x: any) => !!x.image);
        console.log(posts)
        dispatch(postsReceived(posts));
      }
      catch (err){
        fail(err);
      }
  },fail);

  function fail(err: any){
    console.log(err);
    dispatch(loadingFailed(err));
  }
}