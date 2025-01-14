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
            throw new Error('data is not found');
        } else {
            console.log(result.data);
            return result.data;
        }

    } catch (e) {
        console.log(e);
        return null;
    }
}

export async function objectSearchRequest(requestValues: HistogramReqValues) {
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

        let result = await response.json();

        if (!result.items) {
            throw new Error("'items' is not found");
        } else {
            console.log(result.items);
        }
    } catch (e) {
        console.log(e);
        return null;
    }
}

export async function documentRequest(requestValues: ObjectSearchReqValues) {
    try {
        let response = await fetch('https://gateway.scan-interfax.ru/api/v1/documents', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${requestValues.accessToken}`
            },
            body: JSON.stringify({
                ids: ['1:0JPQqdGM0JNWCdCzf2Jt0LHQotGV0ZUh0ZbRlBXCt0Je0JHQruKAnDcUXkZQ0YvQscKnehLRnNC1KtGK0Ll9BWLigLo/HXXCrhw='
            ]})
        });

        let result = await response.json();

        if (!result.items) {
            throw new Error("mes");
        } else {
            console.log(result.items);
        }
    } catch (e) {
        console.log(Error);
    }
}