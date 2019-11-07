export const HookStream = function(_stream:any, fn: (str: any, encoding: any, fd: any)=>any) {
    // Reference default write method
    const old_write = _stream.write;
    // _stream now write with our shiny function
    _stream.write = fn;

    return function() {
        // reset to the default write method
        _stream.write = old_write;
    };
};