/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2007-2012 1&1 Internet AG, Germany, http://www.1und1.de

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Daniel Wagner (danielwagner)
     * Mustafa Sak (msak)

************************************************************************ */

qx.Class.define("qx.test.bom.History", {

  extend : qx.dev.unit.TestCase,

  include : [qx.dev.unit.MRequirements],

  members :
  {
    __history : null,


    hasNoIe : function()
    {
      return qx.core.Environment.get("engine.name") !== "mshtml";
    },


    setUp : function()
    {
      this.__history = qx.bom.History.getInstance();
    },


    testInstance : function()
    {
      if (!(window == window.top) && qx.core.Environment.get("engine.name") == "mshtml" && qx.core.Environment.get("browser.version") >= 9) {
        this.assertInstance(this.__history, qx.bom.HashHistory);
      } else if (!(window == window.top) && qx.core.Environment.get("engine.name") == "mshtml") {
        this.assertInstance(this.__history, qx.bom.IframeHistory);
      } else if (qx.core.Environment.get("event.hashchange")) {
        this.assertInstance(this.__history, qx.bom.NativeHistory);
      } else if (qx.core.Environment.get("engine.name") == "mshtml") {
        this.assertInstance(this.__history, qx.bom.IframeHistory);
      }
    },


    testAddState : function()
    {
      this.__history.addToHistory("foo", "Title Foo");

      var self = this;
      window.setTimeout(function() {
        self.resume(function() {
          this.__checkState();
        }, self);
      }, 200);

      this.wait();
    },


    testNavigateBack : function()
    {
      this.__history.addToHistory("foo", "Title Foo");
      var self = this;
      window.setTimeout(function() {
        self.resume(function() {
          this.__checkFooAndSetBar();
        }, self);
      }, 200);
      this.wait();
    },


    __checkFooAndSetBar : function()
    {
      var self = this;
      this.assertEquals("foo", this.__history._readState(), "check1");
      this.__history.addToHistory("bar", "Title Bar");
      window.setTimeout(function() {
        self.resume(function() {
          this.__checkBarAndGoBack();
        }, self);
      }, 200);
      this.wait();
    },


    __checkBarAndGoBack : function()
    {
      var self = this;
      this.assertEquals("bar", this.__history._readState(), "check2");
      history.back();
      window.setTimeout(function() {
        self.resume(function() {
          this.__checkState();
        }, self);
      }, 200);
      this.wait();
    },


    __checkState : function()
    {
      this.assertEquals("foo", this.__history._readState(), "check3");
      this.assertEquals("Title Foo", this.__history.getTitle());
    },


    testNavigateBackAfterSetState : function()
    {
      this.__history.setState("affe");

      var self = this;
      window.setTimeout(function() {
        self.resume(function() {
          this.__setState_checkAffeAndSetFoo();
        }, self);
      }, 200);
      this.wait();
    },


    __setState_checkAffeAndSetFoo : function()
    {
      var self = this;
      this.assertEquals("affe", this.__history._readState(), "check0");
      this.__history.setState("foo");
      window.setTimeout(function() {
        self.resume(function() {
          this.__setState_checkFooAndSetBar();
        }, self);
      }, 200);
      this.wait();
    },


    __setState_checkFooAndSetBar : function()
    {
      var self = this;
      this.assertEquals("foo", this.__history._readState(), "check1");
      this.__history.setState("bar");
      window.setTimeout(function() {
        self.resume(function() {
          this.__setState_checkBarAndGoBack();
        }, self);
      }, 300);
      this.wait();
    },


    __setState_checkBarAndGoBack : function()
    {
      var self = this;
      this.assertEquals("bar", this.__history._readState(), "check2");
      return;
      history.back();
      history.back();
      window.setTimeout(function() {
        self.resume(function() {
          this.assertEquals("affe", this.__history._readState(), "check3");
        }, self);
      }, 200);
      this.wait();
    }

  }
});