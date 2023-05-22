import dialogReducer from './dialogReducer'
import filterListReducer from './filterListReducer'
import marketplaveReducer from './marketplaceReducer'
import routerReducer from './routerReducer'
import notificationReducer from './notificationReducer'
 
export default {
    dialog: dialogReducer,
    filter : filterListReducer,
    marketplace: marketplaveReducer,
    selectedRouter : routerReducer,
    notificationReducer: notificationReducer
}