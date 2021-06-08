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
        return props.justify || "space-between"
    }};
    align-items: ${props => {
        if(props.align === "start")   return "flex-start"
        if(props.align === "end")   return "flex-end"
        return props.align || "center"
    }};
    margin: ${props => props.m};
    padding: ${props => props.p};
`
