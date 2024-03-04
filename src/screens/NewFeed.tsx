import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, Image, StyleSheet } from 'react-native';

const NewFeed = ({ initialData }) => {
    const [posts, setPosts] = useState(initialData);
    const [newPostText, setNewPostText] = useState('');

    const addPost = () => {
        if (newPostText.trim() !== '') {
            const newPost = {
                id: Date.now(),
                content: newPostText,
                image: null, // Thêm một trường image mới
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

    return (
        <View style={styles.container}>
            {/* Phần header */}
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

            {/* Phần đăng bài */}
            <View style={styles.postContainer}>
                <TextInput
                    placeholder="Nhập nội dung bài đăng"
                    multiline={true}
                    style={styles.input}
                    value={newPostText}
                    onChangeText={setNewPostText}
                />
                <TouchableOpacity onPress={addPost} style={styles.button}>
                    <Text style={[styles.buttonText, styles.blackText]}>Đăng</Text>
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
                        <TouchableOpacity onPress={() => handleLike(item.id)}>
                            <Text style={styles.blackText}>👍 {item.likes}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => handleComment(item.id, "Bình luận của tôi")}>
                            <Text style={styles.blackText}>💬 Bình luận</Text>
                        </TouchableOpacity>
                        <Text style={styles.blackText}>Comments:</Text>
                        {item.comments.map((comment, index) => (
                            <Text key={index} style={styles.blackText}>{comment}</Text>
                        ))}
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
    postContainer: {
        marginBottom: 20,
    },
    postImage: {
        width: '100%',
        height: 200,
        marginBottom: 10,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
    },
    button: {
        backgroundColor: 'blue',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
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

// Dữ liệu mẫu
const initialData = [
    {
        id: 1,
        content: 'Bài đăng mẫu 1',
        image: require('../Images/DuLich_blog1.jpg'),
        likes: 5,
        comments: ['']
    },
    {
        id: 2,
        content: 'Bài đăng mẫu 2',
        image: require('../Images/DuLich_blog2.jpg'),
        likes: 3,
        comments: ['']
    }
    
    // Thêm các bài đăng khác tại đây...
];


export default () => <NewFeed initialData={initialData} />;
