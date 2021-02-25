import React from 'react';
import { getUserWithUsername, postToJSON } from '../../lib/firebase';
import  UserProfile from '../../components/userProfile';
import Posts  from '../../components/Posts'

export async function getServerSideProps({ query }) {
    const { username } = query;

    const userDoc = await getUserWithUsername(username);

    if (!userDoc) {
        return {
          notFound: true,
        }
    }

    // JSON serializable data
    let user = null;
    let posts = null;
    if (userDoc) {
        user = userDoc.data();
        
        const postsQuery = userDoc.ref
            .collection('posts')
            .where('published', '==', true)
            .orderBy('createdAt', 'desc')
            .limit(5);
        posts = (await postsQuery.get()).docs.map(postToJSON);
    }


    return {
        props: { user, posts }, 
    };
}


const profilePage = ({user,posts}) => {
    return ( 
      <>
      <UserProfile   user ={user}/>
      <Posts  posts={posts} />
      </>
        
    );
};

export default profilePage;