export const ImpletementNPC: (object: any) => boolean = (object: any): boolean => {
    return 'targets' in object && 'allies' in object;
};
