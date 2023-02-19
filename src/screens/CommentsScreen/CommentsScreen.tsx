import {View, Text, FlatList} from 'react-native';
import React from 'react';
import Comment from '../../components/Comment/Comment';
import comments from '../../assets/data/comments.json';

const CommentsScreen = () => {
  return (
    <View>
      <FlatList
        data={comments}
        renderItem={({item}) => (
          <Comment key={item.id} comment={item} includeDetail={true} />
        )}
      />
    </View>
  );
};

export default CommentsScreen;
