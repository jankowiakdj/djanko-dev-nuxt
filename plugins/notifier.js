export default ({ store }, inject) => {
  inject('notifier', {
    showMessage({ message = '' }) {
      store.commit('snackbar/showMessage', { message })
    }
  })
}
