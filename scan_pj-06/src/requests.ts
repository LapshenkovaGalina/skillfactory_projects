export type HistogramReqValues = {
    accessToken: string,
    limit: number,
    startDate: string,
    endDate: string,
    INN: number,
    tonality: string,
    maxFullness: boolean,
    inBusinessNews: boolean,
    onlyMainRole: boolean,
    onlyWithRiskFactors: boolean,
    excludeTechNews: boolean,
    excludeAnnouncements: boolean,
    excludeDigests: boolean
}

export type ObjectSearchReqValues = {
    accessToken: string,
    IDs: Array<string>
}

export type HistogramRespDataType = {
    data: [{
        date: string,
        value: number
    }],
    histogramType: string
}

export async function histogramRequest(requestValues: HistogramReqValues): Promise<Array<HistogramRespDataType> | null> {
    try {
        let response = await fetch('https://gateway.scan-interfax.ru/api/v1/objectsearch/histograms', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${requestValues.accessToken}`
            },
            body: JSON.stringify({
                limit: requestValues.limit,
                sortType: "sourceInfluence",
                sortDirectionType: "desc",
                intervalType: 'month',
                histogramTypes: [
                    'totalDocuments',
                    'riskFactors'
                ],
                issueDateInterval: {
                    startDate: requestValues.startDate,
                    endDate: requestValues.endDate
                },
                searchContext: {
                    targetSearchEntitiesContext: {
                        targetSearchEntities: [{
                            type: 'company',
                            sparkId: null,
                            entityId: null,
                            inn: requestValues.INN,
                            maxFullness: true,
                            inBusinessNews: true
                        }],
                        onlyMainRole: requestValues.onlyMainRole,
                        tonality: requestValues.tonality,
                        onlyWithRiskFactors: requestValues.onlyWithRiskFactors,
                        riskFactors: {
                            and: [],
                            or: [],
                            not: []
                        },
                        themes: {
                            and: [],
                            or: [],
                            not: []
                        }
                    },
                    searchEntitiesFilter: {
                        and: [],
                        or: [],
                        not: []
                    },
                    locationsFilter: {
                        and: [],
                        or: [],
                        not: []
                    },
                    themesFilter: {
                        and: [],
                        or: [],
                        not: []
                    }
                },
                searchArea: {
                    includedSources: [],
                    excludedSources: [],
                    includedSourceGroups: [],
                    excludedSourceGroups: []
                },
                attributeFilters: {
                    excludeTechNews: requestValues.excludeTechNews,
                    excludeAnnouncements: requestValues.excludeAnnouncements,
                    excludeDigests: requestValues.excludeDigests
                },
                similarMode: 'duplicates'
            })
        });

        let result = await response.json();

        if (!result.data) {
            console.debug("result" , result);
            throw new Error('data is not found');
        } else {
            return result.data;
        }

    } catch (e) {
        console.log(e);
        return null;
    }
}

export type ArticleItem = {
    encodedId: string,
    influence: number,
    similarCount: number
}
export type ArticleObjects  = {
    items: ArticleItem[],
    mappings: [
        inn: "string",
        entityIds: number[]
    ]
}

export async function objectSearchRequest(requestValues: HistogramReqValues): Promise<ArticleObjects> {
    try {
        let response = await fetch('https://gateway.scan-interfax.ru/api/v1/objectsearch', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${requestValues.accessToken}`
            },
            body: JSON.stringify({
                limit: requestValues.limit,
                sortType: "sourceInfluence",
                sortDirectionType: "desc",
                intervalType: 'month',
                histogramTypes: [
                    'totalDocuments',
                    'riskFactors'
                ],
                issueDateInterval: {
                    startDate: requestValues.startDate,
                    endDate: requestValues.endDate
                },
                searchContext: {
                    targetSearchEntitiesContext: {
                        targetSearchEntities: [{
                            type: 'company',
                            sparkId: null,
                            entityId: null,
                            inn: requestValues.INN,
                            maxFullness: true,
                            inBusinessNews: true
                        }],
                        onlyMainRole: requestValues.onlyMainRole,
                        tonality: requestValues.tonality,
                        onlyWithRiskFactors: requestValues.onlyWithRiskFactors,
                        riskFactors: {
                            and: [],
                            or: [],
                            not: []
                        },
                        themes: {
                            and: [],
                            or: [],
                            not: []
                        }
                    },
                    searchEntitiesFilter: {
                        and: [],
                        or: [],
                        not: []
                    },
                    locationsFilter: {
                        and: [],
                        or: [],
                        not: []
                    },
                    themesFilter: {
                        and: [],
                        or: [],
                        not: []
                    }
                },
                searchArea: {
                    includedSources: [],
                    excludedSources: [],
                    includedSourceGroups: [],
                    excludedSourceGroups: []
                },
                attributeFilters: {
                    excludeTechNews: requestValues.excludeTechNews,
                    excludeAnnouncements: requestValues.excludeAnnouncements,
                    excludeDigests: requestValues.excludeDigests
                },
                similarMode: 'duplicates'
            })
        });

        if (response.ok) {
            return response.json();
        } else {
            return Promise.reject(response.statusText);
        }

    } catch (e) {
        console.log(e);
        return Promise.reject(e);
    }
}

export type ArticleData = {
    ok: {
        attributes: {
            coverage: {
                state: string,
            },
            influence: number,
            isAnnouncement: boolean,
            isDigest: false,
            isReducedContent: boolean,
            isSpeechRecognition: boolean,
            isTechNews: boolean,
            wordCount: number
        },
        content: {
            markup: string,
        },
        dedupClusterId: string,
        entities: {
            companies: {
                entityId: number,
                isMainRole: boolean,
                isSpeechAuthor: boolean,
                localId: 6,
                name: string,
                suggestedCompanies: [],
                tags: string[]
            }[],
            locations: {
                code: {
                    countryCode: string,
                    isMainRole: boolean,
                    localId: number,
                    name: string
                }
            }[],
            people: {
                isMainRole: boolean,
                isSpeechAuthor: boolean,
                localId: number,
                name: string,
                rotatedName: string,
                tags: string[]
            }[],
            themes: {
                entityId: number,
                localId: number,
                name: string,
                tonality: string
            }[],
        },
        id: string,
        issueDate: string,
        language: string,
        plotClusterId: string,
        schemaVersion: string,
        source: {
            categoryId: number,
            distributionMethodId: number,
            groupId: number,
            id: number,
            levelId: number,
            name: string
        },
        title: {
            markup: string,
            text: string
        },
        url: string,
        version: number
    }
}

export async function documentRequest(requestValues: ObjectSearchReqValues): Promise<ArticleData[]> {
    try {
        let response = await fetch('https://gateway.scan-interfax.ru/api/v1/documents', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${requestValues.accessToken}`
            },
            body: JSON.stringify({
                ids: requestValues.IDs
            })
        });

        if (response.ok) {
            return await response.json();
        } else {
            return Promise.reject(response.statusText)
        }
    } catch (e) {
        console.log(Error);
        return Promise.reject(e)
    }
}



type AccessData = {
    accessToken: string,
    expire: string
}
export async function loginRequest({
    login,
    password}
    : {login: string, password: string}): Promise<AccessData> {
    try {
        let response = await fetch('https://gateway.scan-interfax.ru/api/v1/account/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({
                login, password
            })
        });

        if (response.ok) {
            return await response.json();
        } else {
            return Promise.reject(response.statusText)
        }
    } catch (e) {
        console.log(Error);
        return Promise.reject(e)
    }
}
