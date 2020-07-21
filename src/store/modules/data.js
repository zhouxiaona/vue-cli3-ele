export default {
    state: {
        goodsData: '',
        sellerData: '',
        ratingsData: ''
    },
    mutations:{
        UPDATE_STATE:(state, payload) => {
            state[payload.stateType] = payload.value
        },
        ADD:(state, payload)=>{
            state.goodsData[payload.operateTool[0]].foods[payload.operateTool[1]].count += 1;
            state.goodsData[payload.operateTool[0]].foods[payload.operateTool[1]].showBtn = true;
            state.goodsData[payload.operateTool[0]].foods[payload.operateTool[1]].singleM = state.goodsData[payload.operateTool[0]].foods[payload.operateTool[1]].count * Number(state.goodsData[payload.operateTool[0]].foods[payload.operateTool[1]].price);
        },
        MINUS:(state, payload)=>{
            state.goodsData[payload.operateTool[0]].foods[payload.operateTool[1]].count -= 1;
            if(state.goodsData[payload.operateTool[0]].foods[payload.operateTool[1]].count <= 0){
                state.goodsData[payload.operateTool[0]].foods[payload.operateTool[1]].count = 0;
                state.goodsData[payload.operateTool[0]].foods[payload.operateTool[1]].showBtn = false;
            }
            state.goodsData[payload.operateTool[0]].foods[payload.operateTool[1]].singleM = state.goodsData[payload.operateTool[0]].foods[payload.operateTool[1]].count * Number(state.goodsData[payload.operateTool[0]].foods[payload.operateTool[1]].price);
        }
    },
    actions:{
        updateAction: (context, payload) => {
            context.commit(payload.type, payload)
        },
    }
}