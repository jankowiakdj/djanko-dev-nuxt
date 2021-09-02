export const state = () => ({
  message: ''
})

export const mutations = {
  showMessage(state, payload) {
    state.message = payload.message
  }
}
