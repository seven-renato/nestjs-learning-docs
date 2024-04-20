export default {
    moduleFileExtensions: ['js', 'json', 'ts'],
    testRegex: '.*\\.e2e-spec\\.ts$',
    transform: { // O que precisa ser para compilar
        '^.+\\.(t|j)s$': 'ts-jest',
    },
    collectCoverageFrom: ['**/*.(t|j)s'],
    coverageDirectory: '../coverage',
    testEnvironment: 'node',
}