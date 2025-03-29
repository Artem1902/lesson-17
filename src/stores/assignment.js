import {defineStore} from "pinia";
import {computed, ref} from "vue";
import {useFriendsStore} from "./friends.js";
import {useGiftsStore} from "./gifts.js";

export const useAssignmentStore = defineStore('assignment', () => {
    const assignmentList = ref([])

    function addAssignment(newItemData) {
        assignmentList.value.push({
            id: new Date().getTime(),
            ...newItemData
        })
    }

    function deleteAssignment(assignmentIdToDelete) {
        assignmentList.value = assignmentList.value.filter(i => i.id !== assignmentIdToDelete)
    }


    const friendsStore = useFriendsStore();
    const giftsStore = useGiftsStore();


    const availableFriends = computed(() => {
        const allFriends = friendsStore.getItems;

        return allFriends.filter(friend =>
            !assignmentList.value.some(assign => assign.friend == friend.name)
        );
    });

    const availableGifts = computed(() => {
        const allGifts = giftsStore.getItems;

        return allGifts.filter(gift =>
            !assignmentList.value.some(assign => assign?.gift == gift.name)
        );
    });

    return {
        assignmentList,
        addAssignment,
        availableFriends,
        availableGifts,
        deleteAssignment
    };
});
