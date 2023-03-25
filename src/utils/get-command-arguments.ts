export const getCommandArguments = (text: string): string | null => {
    const reg = /(?:^|\s)\/\S+/g;

    return text.replace(reg, "").trim() || null;
};
