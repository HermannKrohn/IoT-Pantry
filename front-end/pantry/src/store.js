import { createStore, compose, applyMiddleware } from 'redux'
import history from './history'
import ReduxThunk from 'redux-thunk'

const initState = {
    pantryArr: [],
    categoryArr: [],
    categoryItemArr: [],
    categoryTerms: [],
    errorsArr: [],
    username: ''
}

const reducer = (state, action) => {
    switch(action.type){
        case 'INIT_USER':
            state = {
                ...state,
                username: action.payload
            }
    }
    // switch(action.type){
    //     case 'CREATE_POST':
    //         state = {
    //             ...state,
    //             usersPost: [action.payload, ...state.usersPost],
    //             post: [action.payload, ...state.post]
    //         }
    //     break
    //     case 'CURRENT_USER':
    //         state = {
    //             ...state,
    //             currentUser: action.payload
    //         }
    //     break
    //     case 'GET_USERS':
    //         state = {
    //             ...state,
    //             users: action.payload
    //         }
    //     break
    //     case 'USERS_POSTS':
    //         state = {
    //             ...state,
    //             usersPost: state.usersPost.concat(action.payload)
    //         }
    //     break
    //     case 'GET_FOLLOWERS':
    //         state = {
    //             ...state,
    //             followers: action.payload
    //         }
    //     break
    //     case 'GET_FOLLOWING':
    //         state = {
    //             ...state,
    //             following: action.payload
    //         }
    //     break
    //     case 'SET_USER':
    //         state = {
    //             ...state,
    //             chosenUser: action.payload
    //         }
    //     break
    //     case 'CHOSEN_USER_POST':
    //         state = {
    //             ...state,
    //             chosenUserPost: action.payload
    //         }
    //     break
    //     case 'GET_POST':
    //         state = {
    //             ...state,
    //             post: action.payload
    //         }
    //     break
    //     case 'UNFOLLOW_USER':
    //         let following = state.following.filter( (user) => {
    //             return user!==action.payload
    //         })
    //         state = {
    //             ...state,
    //             following: following
    //         }
    //     break
    //     case 'USERS_POST':
    //         state = {
    //             ...state,
    //             usersPost: action.payload
    //         }
    //     break
    //     case 'ATTEND_POST':
    //             state = {
    //                 ...state,
    //                 postsAttending: [action.payload, ...state.postsAttending]
    //             }
    //     break
    //     case 'POST_ATTENDING':
    //             console.log(action.payload)
    //             state = {
    //                 ...state,
    //                 postsAttending: action.payload
    //             }
    //     break
    //     case 'UNATTEND_POST':
    //             let post = state.postsAttending.filter((post) => {
    //                 return post.id!==action.payload.id
    //             })
    //             console.log(post)
    //             state = {
    //                 ...state,
    //                 postsAttending: post
    //             }
    //     break

    // }
    return state
}

const middleware = compose(
    applyMiddleware(ReduxThunk),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

export const store = createStore(
    reducer,
    initState,
    middleware
)