export const SELECT_COMMUNITY = 'SELECT_COMMUNITY';
export function changeCommunity(community) {
    return {
        type: SELECT_COMMUNITY,
        community: community
    }
}