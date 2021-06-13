import styled from "styled-components"

export const StCenterWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`

export const StKingWrapper = styled.div`
    display: flex;
    flex-direction: ${props => props.direction || "column" };
    justify-content: ${props => {
        if(props.justify === "start")   return "flex-start"
        if(props.justify === "end")   return "flex-end"
        if(props.justify === "between")   return "space-between"
        if(props.justify === "around")   return "space-around"
        if(props.justify === "evenly")   return "space-evenly"
        return props.justify || "flex-start"
    }};
    align-items: ${props => {
        if(props.align === "start")   return "flex-start"
        if(props.align === "end")   return "flex-end"
        return props.align || "flex-start"
    }};
    margin: ${props => props.m};
    padding: ${props => props.p};
`

export const StVerticalScrollWrapper = styled.div`
    &::-webkit-scrollbar {
        -webkit-appearance: none
    }
    &::-webkit-scrollbar:vertical {
        width: 11px;
    }
    &::-webkit-scrollbar-thumb {
        background-color: ${p => p.theme.accentColor};
        border-radius: 10px;
        border-right: 3px solid white
    }
`

export const StHorizontalScrollWrapper = styled.div`
    &::-webkit-scrollbar {
        -webkit-appearance: none
    }
    &::-webkit-scrollbar:horizontal {
        height: 11px;
    }
    &::-webkit-scrollbar-thumb {
        background-color: ${p => p.theme.accentColor};
        border-radius: 10px;
        border-bottom: 3px solid white
    }
`