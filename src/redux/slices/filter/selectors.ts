import { RootState } from '../../store';

export const selectFilter = (state: RootState) => state.filter;
export const selectSortType = (state: RootState) => state.filter.sortType.name;
