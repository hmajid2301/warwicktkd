<!DOCTYPE html>
<html lang="en">
  <head>
    <!--Add header data (such as import stylesheets) -->
    <?php include 'php/head.php' ?>
    <title>Theory Game</title>
  </head>
  <body>
    <div id="wrapper">
    <!--Add header including logo, and navbar elements -->
      <?php include 'php/header.php' ?>
      <div id="quiz-container">
        <div class="intro">
          <h2>Tae Kwon Do - Theory Quiz</h2>

          <div class="row">
            <label class="radio-inline white active animated bounceInLeft wow">
              <input type="radio" name="option" class="grade" id="inlineRadio1" value="1" checked> White Belt
              <i class="fa fa-check"></i>
            </label>
            
            <label class="radio-inline yellow animated bounceInLeft wow delay-2">
              <input type="radio" name="option"  class="grade" id="inlineRadio2" value="2"> Yellow Tag
              <i class="fa fa-check"></i>
            </label>
            
            <label class="radio-inline yellow-darker animated bounceInLeft wow delay-3">
              <input type="radio" name="option" class="grade" id="inlineRadio3" value="3"> Yellow Belt
              <i class="fa fa-check"></i>
            </label>
            
            <label class="radio-inline green animated bounceInLeft wow delay-4">
              <input type="radio" name="option" class="grade" id="inlineRadio4" value="4"> Green Tag
              <i class="fa fa-check"></i>
            </label>
            
            <label class="radio-inline green-darker animated bounceInLeft wow delay-4">
              <input type="radio" name="option" class="grade" id="inlineRadio5" value="5"> Green Belt
              <i class="fa fa-check"></i>
            </label>
          </div> <!-- End of row -->

          <div class="row">
            <label class="radio-inline blue animated bounceInLeft wow delay-4">
              <input type="radio" name="option" class="grade" id="inlineRadio6" value="6"> Blue Tag
              <i class="fa fa-check"></i>
            </label>
            
            <label class="radio-inline blue-darker animated bounceInLeft wow delay-4">
              <input type="radio" name="option" class="grade" id="inlineRadio7" value="7"> Blue Belt
              <i class="fa fa-check"></i>
            </label>
            
            <label class="radio-inline red animated bounceInLeft wow delay-4">
              <input type="radio" name="option" class="grade" id="inlineRadio8" value="8"> Red Tag
              <i class="fa fa-check"></i>
            </label>
            
            <label class="radio-inline red-darker animated bounceInLeft wow delay-5">
              <input type="radio" name="option" class="grade" id="inlineRadio9" value="9"> Red Belt
              <i class="fa fa-check"></i>
            </label>
            
            <label class="radio-inline black animated bounceInLeft wow delay-6">
              <input type="radio" name="option" class="grade" id="inlineRadio10" value="10"> Black Tag
              <i class="fa fa-check"></i>
            </label>
          </div> <!-- End of row -->

          <button class="btn btn-danger start animated wow bounceInDown">Start </button>
        </div> <!-- Introduction page -->
        <div class="question">
        </div><!-- End of question --> 
      </div><!-- End of quiz container -->
    </div><!--End of wrapper -->
    <!--Add footer, contains 3 columns layout Add footer data, such as jquery, boostrap javascript -->
    <?php include 'php/footer.php' ?>
    <script src="js/quiz.js"></script>
  </body>
</html>

