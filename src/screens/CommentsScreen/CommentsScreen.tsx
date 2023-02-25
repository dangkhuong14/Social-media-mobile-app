import {View, Text, FlatList} from 'react-native';
import React from 'react';
import Comment from '../../components/Comment/Comment';
import comments from '../../assets/data/comments.json';
import CommentsInput from './CommentsInput';

const CommentsScreen = () => {
  return (
    <View style={{flex: 1}}>
      <FlatList
        data={comments}
        renderItem={({item}) => (
          <Comment key={item.id} comment={item} includeDetail={true} />
        )}
      />
      <CommentsInput />
    </View>
  );
};

export default CommentsScreen;
