import { useReducer } from 'react';
import { getTrad } from '../../utils';
import reducer, { initialState } from './reducer';
import { SHOW_MODAL, HIDE_MODAL, RESOLVE_LOCALE, DELETE_LOCALE } from './constants';

const useDeleteLocale = () => {
  const [{ isDeleteModalOpen, isDeleting }, dispatch] = useReducer(reducer, initialState);

  const deleteLocale = () => {
    dispatch({ type: DELETE_LOCALE });

    return new Promise(resolve =>
      setTimeout(() => {
        dispatch({ type: RESOLVE_LOCALE });

        strapi.notification.toggle({
          type: 'success',
          message: { id: getTrad('Settings.locales.modal.delete.success') },
        });

        resolve();
      }, 1000)
    );
  };

  const showDeleteModal = localeToDelete => dispatch({ type: SHOW_MODAL, localeToDelete });
  const hideDeleteModal = () => dispatch({ type: HIDE_MODAL });

  return { isDeleting, isDeleteModalOpen, deleteLocale, showDeleteModal, hideDeleteModal };
};

export default useDeleteLocale;
