function confidence(upVotes, downVotes){
  var totalVotes = upVotes + downVotes;
  var zValue;
  var confidenceScore;

  if(totalVotes === 0){
    return 0;
  }

  zValue = 1.6 // it's a stat thing. it determines confidence that a probability is 95% correct. fake math.

  pHat = upVotes/totalVotes;

  confidenceScore = Math.sqrt(pHat+zValue*zValue/(2*totalVotes)-zValue*((pHat*(1-pHat)+zValue*zValue/(4*totalVotes))/totalVotes))/(1+zValue*zValue/totalVotes);
  console.log(confidenceScore);
  return confidenceScore;
}

// confidence(1,10); //3.5 haha
// confidence(1,0); //3.14
// confidence(5,1); //6.94
// confidence(10,1); //8.132
// confidence(100,80);// 7.38
// confidence(400,200);// 8.139
// confidence(40,10); // 8.614
// confidence(1, 100);// 1.45
// confidence(100, 1); // 9.76