import {CompositeNavigationProp, RouteProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import {MaterialTopTabNavigationProp} from '@react-navigation/material-top-tabs';

export type RootNavigatorParamList = {
  Home: undefined;
  Comments: {postId: string};
};

// Cach lam sai
// export type RootNavigationProp = NativeStackNavigationProp<RootNavigatorParamList, 'Home'>
// export type RootNavigationProp = CompositeNavigationProp<
//   NativeStackNavigationProp<HomeStackNavigatorParamList, 'Feed'>,
//   NativeStackNavigationProp<RootNavigatorParamList>
// >;
// export type RootNavigationProp = CompositeNavigationProp<
//   BottomTabNavigationProp<BottomTabNavigatorParamList, 'HomeStack'>,
//   NativeStackNavigationProp<RootNavigatorParamList>
// >;

// Cach dung
// Thay cho FeedNavigationProp o FeedPost.tsx
export type RootNavigationProp = CompositeNavigationProp<
  NativeStackNavigationProp<HomeStackNavigatorParamList, 'Feed'>,
  CompositeNavigationProp<
    BottomTabNavigationProp<BottomTabNavigatorParamList>,
    NativeStackNavigationProp<RootNavigatorParamList>
  >
>;

export type BottomTabNavigatorParamList = {
  HomeStack: undefined;
  Search: undefined;
  Upload: undefined;
  Notifications: undefined;
  MyProfile: undefined;
};

export type SearchTabNavigatorParamList = {
  Users: undefined;
  Posts: undefined;
};

export type UserListItemNavigationProp = CompositeNavigationProp<
  MaterialTopTabNavigationProp<SearchTabNavigatorParamList, 'Users'>,
  NativeStackNavigationProp<HomeStackNavigatorParamList>
>;

export type HomeStackNavigatorParamList = {
  Feed: undefined;
  UserProfile: {userId: string};
};

export type ProfileStackNavigatorParamList = {
  Profile: undefined;
  'Edit Profile': undefined;
};

export type MyProfileNavigationProp = BottomTabNavigationProp<
  BottomTabNavigatorParamList,
  'MyProfile'
>;
export type MyProfileRouteProp = RouteProp<
  BottomTabNavigatorParamList,
  'MyProfile'
>;

export type UserProfileNavigationProp = NativeStackNavigationProp<
  HomeStackNavigatorParamList,
  'UserProfile'
>;
export type UserProfileRouteProp = RouteProp<
  HomeStackNavigatorParamList,
  'UserProfile'
>;

export type FeedNavigationProp = NativeStackNavigationProp<
  HomeStackNavigatorParamList,
  'Feed'
>;

export type ProfileNavigationProp = NativeStackNavigationProp<
  ProfileStackNavigatorParamList,
  'Profile'
>;
