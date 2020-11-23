const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();
const db = admin.firestore();

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

module.exports = {
	authOnCreate: functions.auth.user().onCreate((user, ctx) => {
		const { email, uid, displayName } = user;
		
		return db
			.collection('users')
			.doc(uid)
			.set({
				email: email,
				displayName: displayName
			})
			.catch(console.error);
	})
}