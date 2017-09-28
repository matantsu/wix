import { createStore,applyMiddleware  } from 'redux'
import thunk from 'redux-thunk';


// Model


export type Post =
  {
    title: string,
    image: string,
    url: string
  }

type Loading = 
  {status: 'Loading'}
type Error =
  {status: 'Error', error: any}
type Empty =
  {status: 'Empty'}
type Normal =
  {status: 'Normal', posts: Post[], page: number}

export type State = Loading | Error | Empty | Normal

const initial: State = 
  {
    status: 'Empty'
  }


// Actions


export type PreviousAction = {type: 'PreviousAction'}
export const previousAction = (): PreviousAction => ({type: 'PreviousAction'})

export type NextAction = {type: 'NextAction'}
export const nextAction = (): NextAction => ({type: 'NextAction'})

export type PostsReceived = {type: 'PostsReceived', posts: Post[]}
export const postsReceived = (posts: Post[]): PostsReceived => ({type: 'PostsReceived', posts: posts})

export type LoadingPosts = {type: 'LoadingPosts'}
export const loadingPosts = (): LoadingPosts => ({type: 'LoadingPosts'})

export type LoadingFailed = {type: 'LoadingFailed', error: any}
export const loadingFailed = (err: any): LoadingFailed => ({type: 'LoadingFailed', error: err})

export type AppAction 
  = PreviousAction 
  | NextAction 
  | LoadingPosts
  | PostsReceived
  | LoadingFailed


// Root reducer


export const pageSize = 5
export const maxPage = (n: number) => Math.floor(n / pageSize)

const reduce = 
  (state: State = initial, action: AppAction): State =>
    action.type == 'PreviousAction' && state.status == 'Normal' && state.page > 0 ?
      {
        ...state,
        page: state.page - 1
      } :
    action.type == 'NextAction' && state.status == 'Normal' && state.page < maxPage(state.posts.length) ?
      {
        ...state,
        page: state.page + 1
      } :
    action.type == 'LoadingPosts' ?
      {
        status: 'Loading'
      } :
    action.type == 'LoadingFailed' ?
      {
        status: 'Error',
        error: action.error
      } :
    action.type == 'PostsReceived' && action.posts.length > 0 ?
      {
        status: 'Normal',
        posts: action.posts,
        page: 0
      } :
    action.type == 'PostsReceived' ?
      {
        status: 'Empty'
      } :
      state

export const store = createStore(
  reduce,
  applyMiddleware(thunk)
);