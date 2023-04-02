import {useMutation, useQuery} from '@apollo/client';
import {
  CreateLikeMutation,
  CreateLikeMutationVariables,
  DeleteLikeMutation,
  DeleteLikeMutationVariables,
  LikesForPostByUserQuery,
  LikesForPostByUserQueryVariables,
  Post,
  UpdatePostMutation,
  UpdatePostMutationVariables,
} from '../../API';
import {
  createLike,
  deleteLike,
  likesForPostByUser,
  updatePost,
} from './queries';
import {useAuthContext} from '../../contexts/AuthContext';

const useLikeService = (post: Post) => {
  const {userId} = useAuthContext();
  const [doUpdatePost, {loading: updatePostLoading}] = useMutation<
    UpdatePostMutation,
    UpdatePostMutationVariables
  >(updatePost);

  const [doCreateLike, {loading: createLikeLoading}] = useMutation<
    CreateLikeMutation,
    CreateLikeMutationVariables
  >(createLike, {
    variables: {input: {postID: post.id, userID: userId}},
    refetchQueries: ['LikesForPostByUser'],
  });

  const [doDeleteLike, {loading: deleteLikeLoading}] = useMutation<
    DeleteLikeMutation,
    DeleteLikeMutationVariables
  >(deleteLike);

  const {data: userLikeData} = useQuery<
    LikesForPostByUserQuery,
    LikesForPostByUserQueryVariables
  >(likesForPostByUser, {variables: {postID: post.id, userID: {eq: userId}}});

  const userLike = (userLikeData?.likesForPostByUser?.items || []).filter(
    like => !like?._deleted,
  )?.[0];

  const adjustNumberOfLikes = (ammount: 1 | -1) => {
    doUpdatePost({
      variables: {
        input: {
          id: post.id,
          _version: post._version,
          nofLikes: post.nofLikes + ammount,
        },
      },
    });
  };

  const addLike = () => {
    doCreateLike();
  };

  const removeLike = () => {
    if (userLike)
      doDeleteLike({
        variables: {input: {id: userLike.id, _version: userLike._version}},
      });
  };

  const toggleLike = () => {
    if (userLike) {
      removeLike();
      adjustNumberOfLikes(-1);
      return;
    }
    addLike();
    adjustNumberOfLikes(1);
  };

  return {
    updatePostLoading,
    createLikeLoading,
    deleteLikeLoading,
    toggleLike,
    isUserLiked: !!userLike,
  };
};

export default useLikeService;
