const requireAll = (requireContext: { keys: Function }) => requireContext.keys().map(requireContext)
const req = require.context('../../assets/icons', false, /\.svg$/)

export default () => requireAll(req)
