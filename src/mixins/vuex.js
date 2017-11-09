'use strict'

import state from 'store/state'
import actions from 'store/actions'
import { mapState, mapActions } from 'vuex'

export default {
  computed: mapState(Object.keys(state)),
  methods: mapActions(Object.keys(actions))
}
