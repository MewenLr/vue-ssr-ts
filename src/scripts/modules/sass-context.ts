const requireAll = (requireContext: { keys: Function }) => requireContext.keys().map(requireContext)
const req = require.context('../..', true, /\.sass$/)

export default () => requireAll(req)
