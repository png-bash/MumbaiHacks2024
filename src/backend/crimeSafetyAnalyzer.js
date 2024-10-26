// // crimeSafetyAnalyzer.js
// const fs = require('fs');
// const csv = require('csv-parser');

// class CrimeSafetyAnalyzer {
//     constructor() {
//         this.data = [];
//         this.severityWeights = {
//             'Harassment': 0.6,
//             'Stalking': 0.7,
//             'Domestic Violence': 0.8,
//             'Eve Teasing': 0.5,
//             'Workplace Harassment': 0.4,
//             'Assault': 0.9
//         };
//     }

//     async loadData(filePath) {
//         return new Promise((resolve, reject) => {
//             fs.createReadStream(filePath)
//                 .pipe(csv())
//                 .on('data', (row) => {
//                     // Convert string numbers to floats
//                     row.latitude = parseFloat(row.latitude);
//                     row.longitude = parseFloat(row.longitude);
//                     row['no. of cases'] = parseInt(row['no. of cases']);
                    
//                     // Add severity score and weighted cases
//                     row.severityScore = this.severityWeights[row.crime_type] || 0.5;
//                     row.weightedCases = row['no. of cases'] * row.severityScore;
                    
//                     this.data.push(row);
//                 })
//                 .on('end', () => {
//                     resolve();
//                 })
//                 .on('error', (error) => {
//                     reject(error);
//                 });
//         });
//     }

//     calculateDistance(lat1, lon1, lat2, lon2) {
//         const R = 6371; // Earth's radius in kilometers
        
//         const lat1Rad = this.toRadians(lat1);
//         const lat2Rad = this.toRadians(lat2);
//         const deltaLat = this.toRadians(lat2 - lat1);
//         const deltaLon = this.toRadians(lon2 - lon1);

//         const a = Math.sin(deltaLat/2) * Math.sin(deltaLat/2) +
//                   Math.cos(lat1Rad) * Math.cos(lat2Rad) *
//                   Math.sin(deltaLon/2) * Math.sin(deltaLon/2);
        
//         const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
//         return R * c;
//     }

//     toRadians(degrees) {
//         return degrees * (Math.PI/180);
//     }

//     analyzeLocation(latitude, longitude) {
//         const RADIUS_KM = 1.0;        // Search radius
//         const CASE_THRESHOLD = 100;    // Maximum acceptable cases
//         const SEVERITY_THRESHOLD = 0.7; // Maximum acceptable severity

//         // Find crimes within radius
//         const nearbyCrimes = this.data.filter(crime => 
//             this.calculateDistance(
//                 latitude, longitude,
//                 crime.latitude, crime.longitude
//             ) <= RADIUS_KM
//         );

//         // If no crimes nearby, location is safe
//         if (nearbyCrimes.length === 0) {
//             return { safe: true };
//         }

//         // Calculate safety metrics
//         const totalCases = nearbyCrimes.reduce((sum, crime) => sum + crime['no. of cases'], 0);
//         const avgSeverity = nearbyCrimes.reduce((sum, crime) => sum + crime.severityScore, 0) / nearbyCrimes.length;
//         const weightedCases = nearbyCrimes.reduce((sum, crime) => sum + crime.weightedCases, 0);

//         // Check if location is safe
//         const isSafe = totalCases < CASE_THRESHOLD &&
//                       avgSeverity < SEVERITY_THRESHOLD &&
//                       weightedCases < CASE_THRESHOLD;

//         if (isSafe) {
//             return { safe: true };
//         }

//         // Find the highest risk nearby location
//         const highestRiskLocation = nearbyCrimes.reduce((max, crime) => 
//             crime.weightedCases > max.weightedCases ? crime : max
//         );

//         return {
//             safe: false,
//             position: {
//                 latitude: highestRiskLocation.latitude,
//                 longitude: highestRiskLocation.longitude
//             }
//         };
//     }
// }

// // Export the class
// module.exports = CrimeSafetyAnalyzer;


// crimeSafetyAnalyzer.js
const fs = require('fs');
const csv = require('csv-parser');

class CrimeSafetyAnalyzer {
    constructor() {
        this.data = [];
        this.severityWeights = {
            'Harassment': 0.6,
            'Stalking': 0.7,
            'Domestic Violence': 0.8,
            'Eve Teasing': 0.5,
            'Workplace Harassment': 0.4,
            'Assault': 0.9
        };
    }

    async loadData(filePath) {
        return new Promise((resolve, reject) => {
            fs.createReadStream(filePath)
                .pipe(csv())
                .on('data', (row) => {
                    // Convert string numbers to floats
                    row.latitude = parseFloat(row.latitude);
                    row.longitude = parseFloat(row.longitude);
                    row['no. of cases'] = parseInt(row['no. of cases']);
                    
                    // Add severity score and weighted cases
                    row.severityScore = this.severityWeights[row.crime_type] || 0.5;
                    row.weightedCases = row['no. of cases'] * row.severityScore;
                    
                    this.data.push(row);
                })
                .on('end', () => {
                    resolve();
                })
                .on('error', (error) => {
                    reject(error);
                });
        });
    }

    calculateDistance(lat1, lon1, lat2, lon2) {
        const R = 6371; // Earth's radius in kilometers
        
        const lat1Rad = this.toRadians(lat1);
        const lat2Rad = this.toRadians(lat2);
        const deltaLat = this.toRadians(lat2 - lat1);
        const deltaLon = this.toRadians(lon2 - lon1);

        const a = Math.sin(deltaLat/2) * Math.sin(deltaLat/2) +
                  Math.cos(lat1Rad) * Math.cos(lat2Rad) *
                  Math.sin(deltaLon/2) * Math.sin(deltaLon/2);
        
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
        return R * c;
    }

    toRadians(degrees) {
        return degrees * (Math.PI/180);
    }

    analyzeLocation(latitude, longitude) {
        const RADIUS_KM = 1.0;        // Search radius
        const CASE_THRESHOLD = 100;    // Maximum acceptable cases
        const SEVERITY_THRESHOLD = 0.7; // Maximum acceptable severity

        // Find crimes within radius
        const nearbyCrimes = this.data.filter(crime => 
            this.calculateDistance(
                latitude, longitude,
                crime.latitude, crime.longitude
            ) <= RADIUS_KM
        );
        const totalCases = nearbyCrimes.reduce((sum, crime) => sum + crime['no. of cases'], 0);
        const avgSeverity = nearbyCrimes.reduce((sum, crime) => sum + crime.severityScore, 0) / nearbyCrimes.length;
        const weightedCases = nearbyCrimes.reduce((sum, crime) => sum + crime.weightedCases, 0);
        // If no crimes nearby, location is safe
        if (nearbyCrimes.length === 0) {
            return { 
                safe: true,
                message: "Location is safe. No nearby crimes found.",
                position: {
                    latitude:latitude,
                    longitude:longitude
                },
                total_cases_nearby: totalCases,
            average_severity: avgSeverity,
            
                
            };
        }

        // Calculate safety metrics


        // Check if location is safe
        const isSafe = totalCases < CASE_THRESHOLD &&
                      avgSeverity < SEVERITY_THRESHOLD &&
                      weightedCases < CASE_THRESHOLD;

        // Find the highest risk nearby location
        const highestRiskLocation = nearbyCrimes.reduce((max, crime) => 
            crime.weightedCases > max.weightedCases ? crime : max
        );

        return {
            safe: isSafe,
            crime_type: highestRiskLocation.crime_type,
            position: {
                latitude: highestRiskLocation.latitude,
                longitude: highestRiskLocation.longitude
            },
            total_cases_nearby: totalCases,
            average_severity: avgSeverity,
            highest_risk: {
                no_of_cases: highestRiskLocation['no. of cases'],
                severity_score: highestRiskLocation.severityScore,
                description: highestRiskLocation.description
            }
        };
    }
}

// Export the class
module.exports = CrimeSafetyAnalyzer;
