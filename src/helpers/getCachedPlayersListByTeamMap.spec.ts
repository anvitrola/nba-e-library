import { getCachedPlayersListByTeamMap, PLAYERS_LIST_CACHE_KEY } from "./getCachedPlayersListByTeamMap";

// Mock sessionStorage
const sessionStorageMock = {
    getItem: jest.fn(),
    setItem: jest.fn(),
    clear: jest.fn(),
};

// Mock Date.now() to return a fixed timestamp
const originalDateNow = Date.now;
Date.now = jest.fn(() => 1639987200000); // Replace with your desired timestamp


describe("getCachedPlayersListByTeamMap", () => {
    beforeAll(() => {
        Object.defineProperty(window, "sessionStorage", {
            value: sessionStorageMock,
        });
    });

    afterEach(() => {
        sessionStorageMock.getItem.mockClear();
        sessionStorageMock.setItem.mockClear();
        Date.now = originalDateNow;
    });

    it("should return cached data if within the threshold", () => {
        const currentTimeStamp = Math.floor(Date.now() / 1000);
        const threshold = 18000; // 5 hours
        const cachedData = {
            timestamp: currentTimeStamp - threshold / 2, // Within the threshold
            playersListByTeamMap: {
                1: [{ id: 1, name: "Player 1" }],
                2: [{ id: 2, name: "Player 2" }],
            },
        };

        sessionStorageMock.getItem.mockReturnValueOnce(JSON.stringify(cachedData));

        const result = getCachedPlayersListByTeamMap();

        expect(sessionStorageMock.getItem).toHaveBeenCalledWith(PLAYERS_LIST_CACHE_KEY);
        expect(result).toEqual(cachedData.playersListByTeamMap);
    });

    it("should return null if no cached data", () => {
        // Mock sessionStorage.getItem to return null (no cached data)
        sessionStorageMock.getItem.mockReturnValueOnce(null);

        const result = getCachedPlayersListByTeamMap();

        expect(sessionStorageMock.getItem).toHaveBeenCalledWith(PLAYERS_LIST_CACHE_KEY);
        expect(result).toBeNull();
    });

    it("should return null if outside the threshold", () => {
        const currentTimeStamp = Math.floor(Date.now() / 1000);
        const threshold = 18000; // 5 hours

        const cachedData = {
            timestamp: currentTimeStamp - threshold * 2, // Outside the threshold
            playersListByTeamMap: {
                1: [{ id: 1, name: "Player 1" }],
                2: [{ id: 2, name: "Player 2" }],
            },
        };

        // Mock sessionStorage.getItem to return data outside the threshold
        sessionStorageMock.getItem.mockReturnValueOnce(JSON.stringify(cachedData));

        const result = getCachedPlayersListByTeamMap();

        expect(sessionStorageMock.getItem).toHaveBeenCalledWith(PLAYERS_LIST_CACHE_KEY);
        expect(result).toBeNull();
    });

});
