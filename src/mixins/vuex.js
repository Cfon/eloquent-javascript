'use strict'

import state from 'store/state'
import actions from 'store/actions'
import getters from 'store/getters'
import { mapState, mapGetters, mapActions } from 'vuex'

export default {
  computed: {
    ...mapState(Object.keys(state)),
    ...mapGetters(Object.keys(getters))
  },
  methods: mapActions(Object.keys(actions))
}
