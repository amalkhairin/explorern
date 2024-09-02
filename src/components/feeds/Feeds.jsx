import dayjs from 'dayjs';
import React, { useCallback, useMemo, useRef, useState } from 'react'
import relativeTime from 'dayjs/plugin/relativeTime';
import FeedHeader from './FeedHeader';
import { Button, Image, Text } from 'react-native';
import FeedActions from './FeedActions';
import FeedLikes from './FeedLikes';
import FeedCaption from './FeedCaption';
import { FlatList, TouchableOpacity } from 'react-native';
import {
    BottomSheetModal,
    BottomSheetView,
    BottomSheetModalProvider,
    useBottomSheetModal,
} from '@gorhom/bottom-sheet';
import CustomBottomSheetModal from '../CustomBottomSheetModal';

dayjs.extend(relativeTime);

const getPostDateText = (dateUnix) => {
    const currentDate = dayjs(Date.now());
    const weeksCount = currentDate.diff(dateUnix, "week");
    // jika dalam hari yang sama maka hours ago
    // jika kemarin maka yesterday
    // masih dalam seminggu, days ago
    if (weeksCount < 1) {
        return dayjs(dateUnix).fromNow();
    }
    const yearsCount = currentDate.diff(dateUnix, "year");
    // kalau dalam tahun yang sama maka misal April 21
    if (yearsCount < 1) {
        return dayjs(dateUnix).format("MMMM YY");
    }
    // kalau beda tahun maka December 8, 2023
    else {
        return dayjs(dateUnix).format("MMMM D, YYYY");
    }
};

const Feeds = () => {

    const bottomSheetRef = useRef(null);
    const { dismiss } = useBottomSheetModal();
    const [indexModal, setIndexModal] = useState(0);

    const snapPoints = useMemo(() => ['50%', '90%'], []);

    const handlePresentModalPress = useCallback((val) => {
        bottomSheetRef.current?.present();
        setIndexModal(val);
    }, []);
    const handleSheetChanges = useCallback((index) => {
        console.log('handleSheetChanges', index);
    }, []);

    // props.item
    const Feed = (props) => {
        const postDateText = getPostDateText(props.item.feed.postDate);
        return (
            <>
                <CustomBottomSheetModal
                    ref={bottomSheetRef}
                    index={indexModal}
                    onDismiss={handleSheetChanges}
                />
                <FeedHeader {...props} />
                <Image
                    source={{
                        uri: props.item.feed.imageUrl,
                    }}
                    style={{
                        width: "100%",
                        aspectRatio: 1,
                        marginTop: 7,
                    }}
                />
                <FeedActions {...props} onCommentPressed={() => handlePresentModalPress(1)} />
                <FeedLikes {...props} />
                <FeedCaption {...props} />
                <TouchableOpacity onPress={() => handlePresentModalPress(0)}>
                    <Text style={{ color: "gray" }}>
                        View All {props.item.feed.totalComments} Comments
                    </Text>
                </TouchableOpacity>
                <Text style={{ color: "gray" }}>{postDateText}</Text>
            </>
        );
    };

    return (
        <FlatList
            data={FEED_DATA}
            style={{
                paddingHorizontal: 10,
                backgroundColor: "white",
            }}
            renderItem={Feed}
        />
    );
};

const FEED_DATA = [
    {
        username: "Juan Dwiky",
        imageUrl:
            "https://i.pinimg.com/736x/e8/02/e7/e802e799104b921a6b6520b01032abd4.jpg",
        hasActiveStory: false,
        feed: {
            imageUrl:
                "https://images.unsplash.com/photo-1533621834623-d0b25d0b14e7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dmFjYXRpb24lMjBtYW58ZW58MHx8MHx8fDA%3D",
            totalLikes: 10,
            friendLikes: [
                {
                    name: "Dhandi",
                    imageUrl:
                        "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/64d92a54-b206-481d-814e-de021ac31156/dfi2aq6-7d83ac2a-3da8-40da-87fa-ff3cb91c812d.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzY0ZDkyYTU0LWIyMDYtNDgxZC04MTRlLWRlMDIxYWMzMTE1NlwvZGZpMmFxNi03ZDgzYWMyYS0zZGE4LTQwZGEtODdmYS1mZjNjYjkxYzgxMmQuanBnIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.sUgsOyBGsFYDbc1QEV6aU-gG8h03TA5tJXOX5crnydw",
                },
                {
                    name: "Yudha",
                    imageUrl:
                        "https://assets.entrepreneur.com/content/3x2/2000/20180703190744-rollsafe-meme.jpeg?format=pjeg&auto=webp&crop=4:3",
                },
                {
                    name: "Wibi",
                    imageUrl:
                        "https://play-lh.googleusercontent.com/KnFMQzTkrsWoyFZPDovbEGxYbrJF_37APuzIPhYCT_dAFRBKCu57sDiezvQBxoSd5s4=w240-h480-rw",
                },
            ],
            caption:
                "Berakit rakit ke hulu berenang renang ketepian, bersakit sakit dahulu bersenang senang dalam kesepian. Kerja keras, istirahat dan tidur yang cukup, dan banyak berdoa dan bersyukur.",
            totalComments: 5,
            postDate: Date.now() - 60 * 60 * 24 * 1000 * 199,
        },
    },
    {
        username: "Juan Dwiky Clone 1",
        imageUrl:
            "https://i.pinimg.com/736x/e8/02/e7/e802e799104b921a6b6520b01032abd4.jpg",
        hasActiveStory: false,
        feed: {
            imageUrl:
                "https://images.unsplash.com/photo-1533621834623-d0b25d0b14e7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dmFjYXRpb24lMjBtYW58ZW58MHx8MHx8fDA%3D",
            totalLikes: 10,
            friendLikes: [
                {
                    name: "Dhandi",
                    imageUrl:
                        "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/64d92a54-b206-481d-814e-de021ac31156/dfi2aq6-7d83ac2a-3da8-40da-87fa-ff3cb91c812d.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzY0ZDkyYTU0LWIyMDYtNDgxZC04MTRlLWRlMDIxYWMzMTE1NlwvZGZpMmFxNi03ZDgzYWMyYS0zZGE4LTQwZGEtODdmYS1mZjNjYjkxYzgxMmQuanBnIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.sUgsOyBGsFYDbc1QEV6aU-gG8h03TA5tJXOX5crnydw",
                },
                {
                    name: "Yudha",
                    imageUrl:
                        "https://assets.entrepreneur.com/content/3x2/2000/20180703190744-rollsafe-meme.jpeg?format=pjeg&auto=webp&crop=4:3",
                },
                {
                    name: "Wibi",
                    imageUrl:
                        "https://play-lh.googleusercontent.com/KnFMQzTkrsWoyFZPDovbEGxYbrJF_37APuzIPhYCT_dAFRBKCu57sDiezvQBxoSd5s4=w240-h480-rw",
                },
            ],
            caption:
                "Berakit rakit ke hulu berenang renang ketepian, bersakit sakit dahulu bersenang senang dalam kesepian. Kerja keras, istirahat dan tidur yang cukup, dan banyak berdoa dan bersyukur.",
            totalComments: 5,
            postDate: Date.now() - 60 * 60 * 24 * 1000 * 199,
        },
    },
    {
        username: "Juan Dwiky Clone 2",
        imageUrl:
            "https://i.pinimg.com/736x/e8/02/e7/e802e799104b921a6b6520b01032abd4.jpg",
        hasActiveStory: false,
        feed: {
            imageUrl:
                "https://images.unsplash.com/photo-1533621834623-d0b25d0b14e7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dmFjYXRpb24lMjBtYW58ZW58MHx8MHx8fDA%3D",
            totalLikes: 10,
            friendLikes: [
                {
                    name: "Dhandi",
                    imageUrl:
                        "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/64d92a54-b206-481d-814e-de021ac31156/dfi2aq6-7d83ac2a-3da8-40da-87fa-ff3cb91c812d.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzY0ZDkyYTU0LWIyMDYtNDgxZC04MTRlLWRlMDIxYWMzMTE1NlwvZGZpMmFxNi03ZDgzYWMyYS0zZGE4LTQwZGEtODdmYS1mZjNjYjkxYzgxMmQuanBnIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.sUgsOyBGsFYDbc1QEV6aU-gG8h03TA5tJXOX5crnydw",
                },
                {
                    name: "Yudha",
                    imageUrl:
                        "https://assets.entrepreneur.com/content/3x2/2000/20180703190744-rollsafe-meme.jpeg?format=pjeg&auto=webp&crop=4:3",
                },
                {
                    name: "Wibi",
                    imageUrl:
                        "https://play-lh.googleusercontent.com/KnFMQzTkrsWoyFZPDovbEGxYbrJF_37APuzIPhYCT_dAFRBKCu57sDiezvQBxoSd5s4=w240-h480-rw",
                },
            ],
            caption:
                "Berakit rakit ke hulu berenang renang ketepian, bersakit sakit dahulu bersenang senang dalam kesepian. Kerja keras, istirahat dan tidur yang cukup, dan banyak berdoa dan bersyukur.",
            totalComments: 5,
            postDate: Date.now() - 60 * 60 * 24 * 1000 * 199,
        },
    },
];

export default Feeds;
