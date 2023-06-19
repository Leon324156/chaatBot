export function checkEnvironmentVariable(variableName:string, errorMessage:string) {
    const variable = process.env[variableName] || '';
    if (!variable) {
      console.error(errorMessage);
      process.exit(1);
    }
    return variable;
  }