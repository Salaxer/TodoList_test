import { Resolver } from "react-hook-form";
import { TodoListType } from "./Modal";
import { verifyInput } from "./verifyInput";

export const resolver: Resolver<TodoListType> = async (values) => {
    const { message } = values;
    return {
        values: message ? values : {},
        errors: {
            ...verifyInput('message',message),
        }
    };
};