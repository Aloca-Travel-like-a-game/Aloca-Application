import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, Image, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
const NewFeed = ({ initialData }) => {
    const [posts, setPosts] = useState(initialData);
    const [newPostText, setNewPostText] = useState('');

    const addPost = () => {
        if (newPostText.trim() !== '') {
            const newPost = {
                id: Date.now(),
                content: newPostText,
                image: null,
                likes: 0,
                comments: [],
            };
            setPosts([...posts, newPost]);
            setNewPostText('');
        }
    };

    const handleLike = (postId) => {
        const updatedPosts = posts.map(post => {
            if (post.id === postId) {
                return { ...post, likes: post.likes + 1 };
            }
            return post;
        });
        setPosts(updatedPosts);
    };

    const handleComment = (postId, commentText) => {
        const updatedPosts = posts.map(post => {
            if (post.id === postId) {
                return {
                    ...post,
                    comments: [...post.comments, commentText]
                };
            }
            return post;
        });
        setPosts(updatedPosts);
    };

    const handleSend = (postId, commentText) => {
        if (commentText.trim() !== '') {
            handleComment(postId, commentText);
        }
    };

    return (
        <View style={styles.container}>
            {/* Phần header */}
            <View>
                <View style={styles.headerContainer}>
                    {/* Phần tìm kiếm */}
                    <View style={styles.searchContainer}>
                        <TextInput
                            placeholder="Tìm kiếm"
                            style={styles.searchInput}
                            placeholderTextColor="#ccc"
                        />
                    </View>

                    {/* Phần thông báo */}
                    <TouchableOpacity style={styles.notificationIconContainer}>
                        {/* Icon thông báo */}
                        <Image source={require('../Images/notification_icon.png')} style={styles.notificationIcon} />
                    </TouchableOpacity>

                    {/* Ảnh và tên người dùng */}
                    <View style={styles.userInfoContainer}>
                        <Image source={require('../Images/ImageProfile.png')} style={styles.avatar} />
                    </View>
                </View>
            </View>

            <View>
                <View style={styles.board}>
                    <TouchableOpacity style={styles.circle}><Ionicons name='add' size={30} color='#2AB6AD' /></TouchableOpacity>
                    <Image source={require('../Images/Avatar03.png')} style={styles.circle} />
                    <Image source={require('../Images/Avatar02.png')} style={styles.circle} />
                    <Image source={require('../Images/Avatar01.png')} style={styles.circle} />
                    <Image source={require('../Images/Avatar04.png')} style={styles.circle} />
                    <Image source={require('../Images/Avatar05.png')} style={styles.circle} />

                </View>
            </View>
            <View style={styles.postContainer}>
                <TextInput
                    placeholder="Chia sẻ khoảnh khắc của bạn"
                    multiline={true}
                    style={[styles.input]}
                    placeholderTextColor="black"
                    value={newPostText}
                    onChangeText={setNewPostText}
                />
                <TouchableOpacity onPress={addPost} style={styles.button}>
                    <Image source={require('../Images/Image_nul.png')} style={styles.buttonImage} />
                </TouchableOpacity>
            </View>

            {/* Danh sách bài đăng */}
            <FlatList
                data={posts}
                renderItem={({ item }) => (
                    <View style={styles.post}>
                        <Text style={styles.blackText}>{item.content}</Text>
                        {item.image && (
                            <Image source={item.image} style={styles.postImage} />
                        )}
                        <View style={styles.actionsContainer}>
                            <TouchableOpacity onPress={() => handleLike(item.id)}>
                                <Text style={styles.blackText}>❤️ {item.likes}</Text>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => handleComment(item.id, "Bình luận của tôi")}>
                                <Text style={[styles.blackText, { marginLeft: 10 }]}>💬</Text>
                            </TouchableOpacity>

                            {/* <TouchableOpacity onPress={() => handleSend(item.id, "Gửi")} style={{ marginLeft: 10 }}>
                                <FontAwesome name="send" size={24} color="black" />
                            </TouchableOpacity> */}
                        </View>
                        <Text style={[styles.blackText, { marginLeft: 10 }]}>Comments:</Text>
                        <View style={{ marginLeft: 10 }}>
                            {item.comments.map((comment, index) => (
                                <Text key={index} style={styles.blackText}>{comment}</Text>
                            ))}
                        </View>
                    </View>
                )}
                keyExtractor={(item) => item.id.toString()}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    searchContainer: {
        flex: 1,
        marginRight: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 20,
        paddingHorizontal: 10,
    },
    searchInput: {
        fontSize: 16,
        color: 'black',
    },
    notificationIconContainer: {
        paddingHorizontal: 7,
    },
    notificationIcon: {
        width: 33,
        height: 33,
        tintColor: 'black',
    },
    userInfoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    avatar: {
        width: 43,
        height: 43,
        borderRadius: 25,
    },
    username: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    board: {
        width: 346,
        height: 67,
        backgroundColor: '#2AB6AD',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    circle: {
        width: 45,
        height: 45,
        borderRadius: 60,
        backgroundColor: 'white',
        marginLeft: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },

    actionsContainer: {
        flexDirection: 'row',
        marginBottom: 10,
    },
    postContainer: {
        marginBottom: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',

    },
    postImage: {
        width: '100%',
        height: 200,
        marginBottom: 10,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 20,
        padding: 10,
        marginBottom: 10,
        width: 300,
        height: 42,
    },
    button: {
        width: 40, // Adjust the width as needed
        height: 40, // Adjust the height as needed
        justifyContent: 'center',
        alignItems: 'center',


    },
    buttonImage: {
        width: 41, // Adjust the width as needed
        height: 42, // Adjust the height as needed
        resizeMode: 'contain',
    },
    buttonText: {
        fontWeight: 'bold',
    },
    post: {
        marginBottom: 20,
    },
    blackText: {
        color: 'black',
    },
});

// Sample data
const initialData = [
    {
        id: 1,
        content: 'Bài đăng mẫu 1',
        image: require('../Images/DuLich_blog1.jpg'),
        avatar: require('../Images/Image_nul.png'), // Add the avatar image path
        likes: 5,
        comments: ['']
    },
    {
        id: 2,
        content: 'Bài đăng mẫu 2',
        image: require('../Images/DuLich_blog2.jpg'),
        avatar: require('../Images/Image_nul.png'), // Add the avatar image path
        likes: 3,
        comments: ['']
    },
      {
        id: 3,
        content: 'Bài đăng mẫu 3',
          image: require('../Images/DuLich_blog3.jpeg'),
        avatar: require('../Images/Image_nul.png'), // Add the avatar image path
        likes: 3,
        comments: ['']
    }
    ,
    {
        id: 4,
        content: 'Bài đăng mẫu 4',
        image: require('../Images/DuLich_blog3.jpeg'),
        avatar: require('../Images/Image_nul.png'), // Add the avatar image path
        likes: 3,
        comments: ['']
    }
    ,
    {
        id: 5,
        content: 'Bài đăng mẫu 5',
        image: require('../Images/DuLich_blog3.jpeg'),
        avatar: require('../Images/Image_nul.png'), // Add the avatar image path
        likes: 3,
        comments: ['']
    }

];

export default () => <NewFeed initialData={initialData} />;
